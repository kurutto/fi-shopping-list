import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { serverErrorMessage } from "@/constants/apiMessages";

export async function DELETE(req: Request) {
  try {
    const ids = req.url.split("fridge/")[1].split("/");
    const fridgeId = ids[0];
    const userId = ids[1];
    await prisma.userFridge.delete({
      where: {
        userId_fridgeId: {
          userId: userId,
          fridgeId: fridgeId,
        },
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
