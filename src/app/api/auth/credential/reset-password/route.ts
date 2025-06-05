import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  invalidOrExpiredTokenMessage,
  invalidTokenMessage,
  serverErrorMessage,
} from "@/constants/apiMessages";

export async function PUT(req: Request) {
  try {
    const { token, password } = await req.json();
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    } catch {
      return NextResponse.json(
        { message: invalidOrExpiredTokenMessage, errorId: "INVALID_TOKEN" },
        { status: 400 }
      );
    }
    const email = decoded.email;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (typeof email !== "string") {
      return NextResponse.json(
        { message: invalidTokenMessage, errorId: "INVALID_TOKEN" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findFirst({
      where: { email: email },
      include: {
        credential: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: invalidTokenMessage, errorId: "INVALID_TOKEN" },
        { status: 400 }
      );
    }
    //credentialでアカウントを作成する時に既に登録されているuserIdとemailの場合、新規にcredentialでアカウントを作成できないので、credential[0]としても問題はない
    await prisma.credential.update({
      where: {
        id: user.credential[0].id,
      },
      data: {
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ message: serverErrorMessage }, { status: 500 });
  }
}
