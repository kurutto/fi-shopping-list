import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { serverErrorMessage } from "@/constants/apiMessages";

export async function POST(req: Request) {
  try {
    const { name, email, category, detail } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port: process.env.EMAIL_PORT!,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    } as nodemailer.TransportOptions);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      bcc: process.env.EMAIL_FROM,
      subject: "【FI買物リスト】お問い合わせを受け付けました",
      text: `${name}様\n\nこのたびは「FI買物リスト」へお問い合わせいただき、ありがとうございます。\n以下の内容にて、お問い合わせを受け付けいたしました。\n\n■お名前：${name}\n■メールアドレス：${email}\n■お問い合わせカテゴリ：${category}\n■お問い合わせ内容：\n${detail}\n\n内容を確認のうえ、担当より3営業日以内にご返信いたします。\nお急ぎの場合や追加のご連絡がある場合は、本メールに返信してご連絡ください。\n\n※本メールは自動送信です。ご返信をいただいた場合も、担当者より改めてご連絡差し上げます。\n\n今後ともFI買物リストをよろしくお願いいたします。\n\nFI買物リスト運営チーム\nfishoppinglist@gmail.com  `,
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
