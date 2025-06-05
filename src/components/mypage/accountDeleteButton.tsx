import React from "react";
import { signOut } from "next-auth/react";
import { useHandleOpen } from "@/hooks/useHandleOpen";
import { deleteData } from "@/lib/deleteData";
import { useRouter } from "next/navigation";
import DeleteConfirm from "../confirm/deleteConfirm";
import Button from "../ui/button";
import { UserType } from "@/types/types";

interface AccountDeleteButtonProps {
  user: UserType;
}
const AccountDeleteButton = ({ user }: AccountDeleteButtonProps) => {
  const { isOpen, handleOpen } = useHandleOpen();
  const router = useRouter();
  const handleDelete = async () => {
    signOut();
    await deleteData(`/user/${user.id}`);
    handleOpen(false);
    router.refresh();
    router.push("/signup");
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
        confirmText={`${user.name}アカウントを削除しますか？\n一度削除するとデータは復元できません。`}
        hideNextTime={false}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default AccountDeleteButton;
