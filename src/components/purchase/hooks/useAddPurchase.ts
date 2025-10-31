import { getInventories } from "@/lib/inventory";
import { InventoryType, RegisterItemDataType } from "@/types/types";
import { useEffect, useState } from "react";
import { putData } from "@/lib/putData";
import { networkErrorMessage } from "@/constants/messages";
import { postData } from "@/lib/postData";
import { createId } from "@paralleldrive/cuid2";
import { mutate } from "swr";

export const useAddPurchase = (fridgeId: string) => {
  const [inventories, setInventories] = useState<InventoryType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getInventories(fridgeId);
      setInventories(data);
    };
    getData();
  }, []);

  const addPurchase = async (
    inventoryCheck: boolean,
    values: RegisterItemDataType,
    userId: string,
    kana?: string
  ) => {
    //新規に在庫管理品を登録する場合
    const inventoryId = createId();
    if (inventoryCheck && values.inventoryName) {
      try {
        await postData(`/fridge/${fridgeId}/inventory`, {
          inventoryId: inventoryId,
          fridgeId: fridgeId,
          category: Number(values.category),
          name: values.inventoryName,
          kana: kana,
          amount: values.amount,
        });
        mutate(
          `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/inventory`
        );
      } catch {
        alert(networkErrorMessage);
      }
    } else if (
      //既存の在庫管理品に追加する場合
      inventoryCheck &&
      !values.inventoryName &&
      inventories.length > 0
    ) {
      const targetInventory = inventories.filter(
        (inventory) => inventory.id === values.inventoryId
      );

      //選択された在庫管理品の数量を取得、入力値をプラスして合計を算出する
      const amount =
        targetInventory && targetInventory[0]?.remaining + values.amount;

      //算出された値をデータベースに格納する
      try {
        await putData(`/fridge/${fridgeId}/inventory`, {
          fridgeId: fridgeId,
          inventoryId: values.inventoryId,
          amount: amount,
        });
        mutate(
          `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/inventory`
        );
      } catch {
        alert(networkErrorMessage);
      }
    }

    //新規購入品をデータベースに格納する
    try {
      await postData(`/fridge/${fridgeId}/purchase`, {
        userId: userId,
        fridgeId: fridgeId,
        inventoryId:
          inventoryCheck && !values.inventoryName && inventories.length > 0
            ? values.inventoryId
            : inventoryCheck && values.inventoryName
            ? inventoryId
            : null,
        name: values.name,
        category: Number(values.category),
        date: new Date(values.date),
      });
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/purchase`);
    } catch {
      alert(networkErrorMessage);
    }
  };

  return { inventories, addPurchase };
};
