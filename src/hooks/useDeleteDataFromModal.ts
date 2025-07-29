import { mutate } from "swr";
import { deleteData } from "@/lib/deleteData";

export const useDeleteDataFromModal = () => {
  const deleteItem = async (fetchPath: string, handleOpen: () => void) => {
    const trimmedPath = fetchPath.substring(0, fetchPath.lastIndexOf("/"));
    deleteData(fetchPath);
    mutate(`${process.env.NEXT_PUBLIC_API_URL}${trimmedPath}`);
    handleOpen();
  };
  return { deleteItem };
};
