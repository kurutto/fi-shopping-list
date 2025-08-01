import { InventoryType, KanaDataType } from "@/types/types";

export const getInventories = async (
  fridgeId: string
): Promise<InventoryType[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/inventory`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch inventories");
  }
  return await res.json();
};

export const getKana = async (fridgeId: string, itemName: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/inventory/kana`,
    {
      method: "POST",
      body: JSON.stringify({
        itemName: itemName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch inventories: ${res.status}`);
  }
  const kanaData = await res.json();
  const kanaArr = kanaData.result.word.map((kanaObj: KanaDataType) =>
    kanaObj.furigana ? kanaObj.furigana : kanaObj.surface
  );
  const kana = kanaArr.join("");
  return kana;
};
