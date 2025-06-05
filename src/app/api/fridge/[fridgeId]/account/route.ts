import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { serverErrorMessage } from "@/constants/apiMessages";

export async function POST(req: Request) {
  try {
    const { userId, fridgeId } = await req.json();
    await prisma.userFridge.create({
      data: {
        userId: userId,
        fridgeId: fridgeId,
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ message: serverErrorMessage }, { status: 500 });
  }
}
