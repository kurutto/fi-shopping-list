import React from "react";
import { useSession } from "next-auth/react";
import { useHandleOpen } from "@/hooks/useHandleOpen";
import { deleteData } from "@/lib/deleteData";
import { useRouter } from "next/navigation";
import DeleteConfirm from "../confirm/deleteConfirm";
import Button from "../ui/button";
import { FridgeType } from "@/types/types";

interface AccountDeleteButtonProps {
  fridgeAccount: FridgeType;
}
const AccountDeleteButton = ({ fridgeAccount }: AccountDeleteButtonProps) => {
  const { update } = useSession();
  const { isOpen, handleOpen } = useHandleOpen();
  const router = useRouter();
  const handleDelete = async () => {
    await deleteData(`/fridge/${fridgeAccount.id}`);
    await update({ fridgeId: null, fridgeName: null });
    router.refresh();
    router.push("/member/fridge-account");
  };
  return (
    <>
      <Button
        type="button"
        color="destructive"
        className="w-30"
        onClick={() => handleOpen()}
      >
        削除
      </Button>

      <DeleteConfirm
        isOpen={isOpen}
        handleOpen={handleOpen}
        confirmText={`${fridgeAccount.name}アカウントを削除しますか？\n一度削除するとデータは復元できません。`}
        hideNextTime={false}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default AccountDeleteButton;
