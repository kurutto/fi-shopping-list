"use client";
import Button from "../ui/button";
import { UserFridgeType } from "@/types/types";
import DeleteConfirm from "../confirm/deleteConfirm";
import { useDeleteDataFromModal } from "@/hooks/useDeleteDataFromModal";
import { useHandleOpen } from "@/hooks/useHandleOpen";

interface RemoveFromUserListButtonProps {
  fridgeId: string;
  user: UserFridgeType;
}

const RemoveFromMemberListButton = ({
  fridgeId,
  user,
}: RemoveFromUserListButtonProps) => {
  const { deleteItem } = useDeleteDataFromModal();
  const { isOpen, handleOpen } = useHandleOpen();
  const handleDelete = async () => {
    await deleteItem(`/fridge/${fridgeId}/${user.userId}`, handleOpen);
  };
  return (
    <>
      <Button
        color="secondary"
        size="small"
        onClick={() => handleOpen()}
        className="max-md:ml-4"
      >
        削除
      </Button>
      <DeleteConfirm
        isOpen={isOpen}
        handleOpen={handleOpen}
        confirmText={`${user.user.name}をアカウントから削除しますか？`}
        hideNextTime={false}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default RemoveFromMemberListButton;
