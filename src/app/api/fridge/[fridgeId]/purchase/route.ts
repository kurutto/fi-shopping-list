import { serverErrorMessage } from "@/constants/apiMessages";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, fridgeId, inventoryId, name, category, date } =
      await req.json();
    await prisma.purchase.create({
      data: {
        userId: userId,
        fridgeId: fridgeId,
        inventoryId: inventoryId,
        name: name,
        category: category,
        purchaseDate: date,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
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

export async function GET(req: Request) {
  try {
    const fridgeId = await req.url.split("fridge/")[1].replace("/purchase", "");
    const purchases = await prisma.purchase.findMany({
      where: { fridgeId: fridgeId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(purchases);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ message: serverErrorMessage }, { status: 500 });
  }
}
