"use client";
import { mutate } from "swr";
import Button from "../ui/button";
import { useSession } from "next-auth/react";
import DeleteConfirm from "../confirm/deleteConfirm";
import { PurchaseType } from "@/types/types";
import { useDeleteDataFromRemoveButton } from "@/hooks/useDeleteDataFromRemoveButton";

interface RemovePurchaseButtonProps {
  fridgeId: string;
  purchase: PurchaseType;
}

const RemovePurchaseButton = ({
  fridgeId,
  purchase,
}: RemovePurchaseButtonProps) => {
  const { data: session } = useSession();
  const { isOpen, handleOpen, deleteItem } = useDeleteDataFromRemoveButton();
  const handleDelete = async (nextTimeHideConfirm: boolean | null) => {
    deleteItem(
      `/fridge/${fridgeId}/purchase/${purchase.id}`,
      nextTimeHideConfirm
    );
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/purchase`);
  };
  return (
    <>
      <Button
        variant="delete"
        onClick={() => {
          if (session?.user.deleteConfirm === true) {
            handleOpen();
          } else {
            handleDelete(false);
          }
        }}
        className="absolute top-0 right-0"
        aria-label="購入品削除"
      />
      <DeleteConfirm
        isOpen={isOpen}
        handleOpen={() => handleOpen()}
        confirmText={`${purchase.name}を削除しても良いですか？`}
        hideNextTime={true}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default RemovePurchaseButton;
