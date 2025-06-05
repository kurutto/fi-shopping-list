import { serverErrorMessage } from "@/constants/apiMessages";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, fridgeId, name, amount, dueDate } = await req.json();
    await prisma.shoppingList.create({
      data: {
        userId: userId,
        fridgeId: fridgeId,
        name: name,
        amount: amount,
        dueDate: dueDate,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { message: serverErrorMessage },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const fridgeId = await req.url
      .split("fridge/")[1]
      .replace("/shopping-list", "");
    const shoppingList = await prisma.shoppingList.findMany({
      where: { fridgeId: fridgeId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(shoppingList);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { message: "データの取得に失敗しました。" },
      { status: 500 }
    );
  }
}
