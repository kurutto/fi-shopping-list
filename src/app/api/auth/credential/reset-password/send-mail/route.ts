import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { accountNotFoundMessage } from "@/constants/apiMessages";
import { serverErrorMessage } from "@/constants/apiMessages";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    //アカウントの有無/credentialで登録されているかの確認
    const checkUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
      include:{
        credential:true
      }
    });
    if (!checkUser || checkUser.credential.length===0 ) {
      return NextResponse.json(
        { message: accountNotFoundMessage, errorId: "INVALID_ACCOUNT" },
        { status: 400 }
      );
    }

    const payload = { email };
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

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "【FI買物リスト】パスワードのリセット",
      text: `お問い合わせいただきありがとうございます。パスワードをリセット（再設定）するには、下記のリンクをクリックしてください。\n\n▼メールアドレスの認証\n${verificationUrl}\n\n※このリンクの有効期限は1時間です。\n※本メールにお心当たりのない場合は、お手数ですが破棄してください。\n\nFI買物リスト運営チーム\nfishoppinglist@gmail.com  `,
    });
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ message: serverErrorMessage }, { status: 500 });
  }
}
