import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export async function POST(req: Request, res: Response) {
  try {

    const image  = await req.formData();
    const file = image.get("image") as Blob;
    if (!file) {
      return NextResponse.json({ error: "ファイルが見つかりません" }, { status: 400 });
    }
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const base64Image = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
    // const image  = await req.formData();
    // console.log('imagedata:',image);
    // const file = image.get("image") as Blob;
    // console.log('filedata:',file);
    // if (!file) {
    //   return NextResponse.json({ error: "ファイルが見つかりません" }, { status: 400 });
    // }
    // const fileBuffer = Buffer.from(await file.arrayBuffer());
    // const base64Image = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;

    const data = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `画像から以下の情報を抽出してください。：
- **商品名(よく知られている商品名を選択）**
- **カテゴリ**（食品 / 日用品 / 非常用品)
- **一般名**（商品名が山田醤油なら一般名は「醤油」）

### **出力フォーマット**
次のJSON形式で出力してください。他の説明は不要です。{"items": [{"name": "山田醤油","general_name": "醤油","category": "食品"}]}`,
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
      store: true,
    });

    console.log("data:", data);
    const text = data.choices[0].message
      .content!.replace(/```json|```/g, "")
      .trim();
    return NextResponse.json(text);
  } catch (e) {
    console.log(e);
  }
}
