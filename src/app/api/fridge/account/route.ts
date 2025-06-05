import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";
import { serverErrorMessage } from "@/constants/apiMessages";
export async function POST(req: Request) {
  const { userId, name, description } = await req.json();
  try {
    const fridgeId = createId();
    await prisma.fridge.create({
      data: {
        id: fridgeId,
        name: name,
        description: description,
      },
    });
    await prisma.userFridge.create({
      data: {
        userId: userId,
        fridgeId: fridgeId,
      },
    });

    return NextResponse.json(
      { fridgeId: fridgeId },
      { status: 201 }
    );
  } catch (err) {
      console.error("POST Error:", err);
      return NextResponse.json(
        { message: serverErrorMessage },
        { status: 500 }
      );
  }
}
