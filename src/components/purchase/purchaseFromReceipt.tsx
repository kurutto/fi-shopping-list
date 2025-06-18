import React, { useContext, useRef, useState } from "react";
import { PurchaseItemDataType } from "@/types/types";
import PurchaseFromReceiptTableRow, {
  RegisterItemDataType,
  RegisterItemType,
} from "@/components/purchase/purchaseFromReceiptTableRow";
import { ModalContext, ModalContextType } from "@/context/modalContext";
import { useAddPurchase } from "./hooks/useAddPurchase";
import Box from "@/components/ui/box";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Paragraph from "@/components/ui/paragraph";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

interface PurchaseFromReceiptProps {
  userId: string;
  fridgeId: string;
  purchases: PurchaseItemDataType[];
}

const PurchaseFromReceipt = ({
  userId,
  fridgeId,
  purchases,
}: PurchaseFromReceiptProps) => {
  const { addPurchase,inventories } = useAddPurchase(fridgeId);
  const { handleOpen } = useContext<ModalContextType>(ModalContext);
  const dateRef = useRef<HTMLInputElement>(null);
  const tableRowRefs = useRef<RegisterItemType[]>([]);
  const [isAdded, setIsAdded] = useState("");

  const handleRegistration = async () => {
    let hasErr = false;
    const registerItems: (null | RegisterItemDataType)[] = [];

    //registrationReceiptTableRowにアクセスしてRegisterItem()を発動させる
    //forEachは非同期処理を待たないので使用しない
    for (const item of tableRowRefs.current) {
      const result = await item.RegisterItem();

      //RegisterItem()を発動させた結果をregisterItemsに格納する
      if (result !== undefined) {
        registerItems.push(result);
        if (result === null) {
          hasErr = true;
        }
      }
    }
    if (!hasErr) {
      for (const item of registerItems) {
        if (item) {
          await addPurchase(
            item.addInventory,
            item.data,
            userId,
            item.addInventory && item.inventoryRegistration === "1"
              ? item.kana
              : ""
          );
        }
      }
      setIsAdded("購入品が登録されました");
      setTimeout(() => {
        handleOpen();
      }, 1500);
    }
  };
  return (
    <>
      {isAdded && <Paragraph>{isAdded}</Paragraph>}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader className="text-left">品名</TableHeader>
            <TableHeader className="w-20 whitespace-nowrap">カテゴリ</TableHeader>
            <TableHeader className="w-11 text-nowrap">
              在庫
              <br />
              管理
            </TableHeader>
            <TableHeader className="w-15"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody className="max-h-30">
          {purchases.map((item, idx) => (
            <PurchaseFromReceiptTableRow
              fridgeId={fridgeId}
              item={item}
              date={dateRef.current?.value}
              ref={(func) => {
                tableRowRefs.current[idx] = func as RegisterItemType;
              }}
              inventories={inventories}
              key={idx}
            />
          ))}
        </TableBody>
      </Table>
      <Box variant="horizontally">
        <Label className="w-15">購入日</Label>
        <Input type="date" id="date" ref={dateRef} />
        <Paragraph color="gray" className="w-full text-xs mt-1">
          * 未入力の場合は本日の日付が登録されます
        </Paragraph>
      </Box>
      <Button
        color="primary"
        onClick={handleRegistration}
        className="w-25 mx-auto"
      >
        登録
      </Button>
    </>
  );
};

export default PurchaseFromReceipt;
