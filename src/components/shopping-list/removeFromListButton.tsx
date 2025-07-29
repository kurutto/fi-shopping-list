"use client";
import type { mutate } from "swr";
import Button from "../ui/button";
import DeleteConfirm from "../confirm/deleteConfirm";
import { useSession } from "next-auth/react";
import { ShoppingListType } from "@/types/types";
import { useDeleteDataFromRemoveButton } from "@/hooks/useDeleteDataFromRemoveButton";

interface RemoveFromListButtonProps {
  fridgeId: string;
  listItem: ShoppingListType;
  mutateFnc: typeof mutate;
}

const RemoveFromListButton = ({
  fridgeId,
  listItem,
  mutateFnc,
}: RemoveFromListButtonProps) => {
  const { data: session } = useSession();
  const { isOpen, handleOpen, deleteItem } = useDeleteDataFromRemoveButton();
  const handleDelete = async (nextTimeHideConfirm: boolean | null) => {
    await deleteItem(
      `/fridge/${fridgeId}/shopping-list/${listItem.id}`,
      nextTimeHideConfirm
    );
    mutateFnc(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/shopping-list`
    );
  };
  return (
    <>
      <Button
        variant="delete"
        onClick={() => {
          if (session?.user.deleteConfirm === true) {
            handleOpen();
          } else {
            handleDelete(null);
          }
        }}
        className="absolute top-0 right-0"
        aria-label="買物リストから削除"
      />
      <DeleteConfirm
        isOpen={isOpen}
        handleOpen={handleOpen}
        confirmText={`${listItem.name}を削除しても良いですか？`}
        hideNextTime={true}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default RemoveFromListButton;
