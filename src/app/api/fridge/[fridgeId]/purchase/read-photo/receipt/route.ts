import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export async function POST(req: Request) {
  try {
    console.log('a');
    const image  = await req.formData();
    const file = image.get("image") as Blob;
    console.log('データだよ:',file);
    if (!file) {
      return NextResponse.json({ error: "ファイルが見つかりません" }, { status: 400 });
    }
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const base64Image = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;

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
- **カテゴリ**（0:食品 / 1:日用品 / 2:非常用品)
- **一般名**（商品名が山田醤油なら一般名は「醤油」）

### **出力フォーマット**
次のJSON形式で出力してください。他の説明は不要です。{"items": [{"name": "山田醤油","general_name": "醤油","category": 0},{"name": "小松菜","general_name": "小松菜","category": 0}]}`,
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
    const text = data.choices[0].message
      .content!.replace(/```json|```/g, "")
      .trim();
    const json = JSON.parse(text);
    return NextResponse.json(json);
  } catch (e) {
    console.log(e);
    return NextResponse.json('500サーバーエラー');
  }
}
