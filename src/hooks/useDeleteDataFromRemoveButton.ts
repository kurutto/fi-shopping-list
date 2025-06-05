import { deleteData } from "@/lib/deleteData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export const useDeleteDataFromRemoveButton = () => {
  const { update } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const router = useRouter();
  const deleteItem = async (
    fetchPath: string,
    nextTimeHideConfirm: boolean | null
  ) => {
    await deleteData(fetchPath);
    if (nextTimeHideConfirm) {
      await update({ deleteConfirm: false });
    }
    setIsOpen(false);
    router.refresh();
  };
  return { isOpen, handleOpen, deleteItem };
};
