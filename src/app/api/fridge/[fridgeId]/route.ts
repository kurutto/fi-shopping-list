import {
  idAlreadyRegisteredMessage,
  serverErrorMessage,
} from "@/constants/apiMessages";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { fridgeId, id, name, description } = await req.json();
    const fridge = await prisma.fridge.findFirst({ where: { id: id } });
    if (fridge && fridgeId !== id) {
      return NextResponse.json(
        { message: idAlreadyRegisteredMessage, errorId: "INVALID_ID" },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
    }
    await prisma.fridge.update({
      where: {
        id: fridgeId,
      },
      data: {
        id: id,
        name: name,
        description: description,
      },
    });
    return NextResponse.json({ status: 201 });
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
    const fridgeId = await req.url.split("fridge/")[1];
    const fridgeAccount = await prisma.fridge.findUnique({
      where: { id: fridgeId },
      include: {
        userFridges: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(fridgeAccount);
  } catch (err) {
    console.error("GET Error:", err);
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

export async function DELETE(req: Request) {
  try {
    const fridgeId = req.url.split("fridge/")[1];
    await prisma.fridge.delete({
      where: {
        id: fridgeId,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
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
