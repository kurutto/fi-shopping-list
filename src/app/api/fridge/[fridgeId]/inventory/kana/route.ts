import { NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";
import { serverErrorMessage } from "@/constants/apiMessages";

const YAHOO_API_URL = "https://jlp.yahooapis.jp/FuriganaService/V2/furigana";
const APP_ID = process.env.YAHOO_API_CLIENT_ID;

export async function POST(req: Request) {
  try {
    const { itemName } = await req.json();
    const id = createId();
    const payload: {
      id: string;
      jsonrpc: string;
      method: string;
      params: { q: string; grade: number };
    } = {
      id: id,
      jsonrpc: "2.0",
      method: "jlp.furiganaservice.furigana",
      params: {
        q: itemName,
        grade: 1,
      },
    };
    const res = await fetch(YAHOO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `Yahoo AppID:  ${APP_ID}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return NextResponse.json(data);
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
