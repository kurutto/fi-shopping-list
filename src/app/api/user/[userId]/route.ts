import { serverErrorMessage } from "@/constants/apiMessages";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { userId, id, name } = await req.json();
    const user = await prisma.user.findFirst({ where: { id: id } });
    if (user && userId !== id) {
      return NextResponse.json(
        { message: "このIDは既に登録されています", errorId: "INVALID_ID" },
        { status: 400 }
      );
    }
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        id: id,
        name: name,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json(
      { message: serverErrorMessage },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  const userId = req.url.split("user/")[1];
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userFridges: {
          include: {
            fridge: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { message: serverErrorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = req.url.split("user/")[1];
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return NextResponse.json({ status: 201 });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { message: serverErrorMessage },
      { status: 500 }
    );
  }
}
