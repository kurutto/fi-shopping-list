import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { createId } from "@paralleldrive/cuid2";
import { emailAlreadyRegisteredMessage } from "@/constants/apiMessages";
import { serverErrorMessage } from "@/constants/apiMessages";

export async function POST(req: Request) {
  try {
    const { userId, name, email, password } = await req.json();

    const checkId = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (checkId) {
      return NextResponse.json(
        { message: "このIDは既に登録されています", errorId: "INVALID_ID" },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
    }
    const checkEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      return NextResponse.json(
        {
          message: emailAlreadyRegisteredMessage,
          errorId: "INVALID_EMAIL",
        },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
    }

    const id = createId();
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.credential.create({
      data: {
        id: id,
        hashedPassword: hashedPassword,
      },
    });

    const payload = { id, userId, name, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port: process.env.EMAIL_PORT!,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    } as nodemailer.TransportOptions);

    const verificationUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/signup/verify?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "【FI買物リスト】メールアドレスの認証を完了してください",
      text: `${name}様\n\nFI買物リストにご登録いただきありがとうございます。\n 登録を完了するには、以下のリンクをクリックしてメールアドレスの認証を行ってください。\n\n▼メールアドレスの認証\n${verificationUrl}\n\n※このリンクの有効期限は1時間です。\n※本メールにお心当たりのない場合は、お手数ですが破棄してください。\n\n今後ともFI買物リストをよろしくお願いいたします。\n\nFI買物リスト運営チーム\nfishoppinglist@gmail.com  `,
    });
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error("POST Error:", err);
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
