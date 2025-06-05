import { serverErrorMessage } from "@/constants/apiMessages";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const itemId = req.url.split("purchase/")[1];
    await prisma.purchase.delete({
      where: {
        id: itemId,
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (err) {
      console.error("DELETE Error:", err);
      return NextResponse.json({ message: serverErrorMessage }, { status: 500 });
  }
}
