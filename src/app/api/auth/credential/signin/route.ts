import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  idNotRegisteredMessage,
  passwordIncorrectMessage,
  serverErrorMessage,
} from "@/constants/apiMessages";

export async function POST(req: Request) {
  try {
    const { id, password } = await req.json();
    const existingUser = await prisma.credential.findFirst({
      where: {
        userId: id,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        { message: idNotRegisteredMessage },
        { status: 400 }
      );
    }

    const hashedPassword = existingUser.hashedPassword;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (isMatch) {
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      return NextResponse.json(user, { status: 201 });
    } else {
      return NextResponse.json(
        { message: passwordIncorrectMessage },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ message: serverErrorMessage }, { status: 500 });
  }
}
