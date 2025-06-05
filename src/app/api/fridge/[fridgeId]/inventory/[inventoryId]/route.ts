import { serverErrorMessage } from "@/constants/apiMessages";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const inventoryId = req.url.split("inventory/")[1];
    await prisma.inventory.delete({
      where: {
        id: inventoryId,
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ message: serverErrorMessage }, { status: 500 });
  }
}
