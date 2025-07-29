import { mutate } from "swr";
import { deleteData } from "@/lib/deleteData";
import { useState } from "react";
import { useSession } from "next-auth/react";

export const useDeleteDataFromRemoveButton = () => {
  const { update } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const deleteItem = async (
    fetchPath: string,
    nextTimeHideConfirm: boolean | null
  ) => {
    const trimmedPath = fetchPath.substring(0, fetchPath.lastIndexOf("/"));
    await deleteData(fetchPath);
    if (nextTimeHideConfirm) {
      await update({ deleteConfirm: false });
    }
    mutate(`${process.env.NEXT_PUBLIC_API_URL}${trimmedPath}`);
    setIsOpen(false);
  };
  return { isOpen, handleOpen, deleteItem };
};
