import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import {
  invalidTokenMessage,
  invalidOrExpiredTokenMessage,
  serverErrorMessage,
} from "@/constants/apiMessages";

export async function GET(req: Request) {
  try {
    const token = await req.url.split("?token=")[1];
    if (!token) {
      return NextResponse.json(
        { message: invalidTokenMessage },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    } catch {
      return NextResponse.json(
        { message: invalidOrExpiredTokenMessage },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
    }
    const id = decoded.id;
    const userId = decoded.userId;
    const name = decoded.name;
    const email = decoded.email;

    // usersテーブルにアカウントを追加
    await prisma.user.create({
      data: {
        id: userId,
        name: name,
        email: email,
      },
    });

    // ユーザーを認証済みに変更,userIdセット
    await prisma.credential.update({
      where: {
        id: id,
      },
      data: {
        userId: userId,
        emailVerified: new Date(),
      },
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { message: serverErrorMessage },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  }
}
