import { serverErrorMessage } from "@/constants/apiMessages";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const itemId = req.url.split("shopping-list/")[1];
    await prisma.shoppingList.delete({
      where: {
        id: itemId,
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (err) {
    console.error("DELETE Error:", err);
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
