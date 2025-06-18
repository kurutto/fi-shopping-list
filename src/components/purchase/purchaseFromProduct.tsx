import React from "react";
import Heading from "../ui/heading";
import { PurchaseItemDataType } from "@/types/types";
import PurchaseForm from "./purchaseForm";

interface PurchaseFromProductProps {
  userId: string;
  fridgeId: string;
  purchases: PurchaseItemDataType[];
}
const PurchaseFromProduct = ({
  userId,
  fridgeId,
  purchases,
}: PurchaseFromProductProps) => {
  return (
    <>
      <Heading level={3} className="text-center">
        商品画像読取結果
      </Heading>
      <PurchaseForm userId={userId} fridgeId={fridgeId} purchases={purchases} />
    </>
  );
};

export default PurchaseFromProduct;
