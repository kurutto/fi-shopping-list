import { deleteData } from "@/lib/deleteData";
import { useRouter } from "next/navigation";

export const useDeleteDataFromModal = () => {
  const router = useRouter();
  const deleteItem = async (fetchPath: string, handleOpen: () => void) => {
    deleteData(fetchPath);
    router.refresh();
    handleOpen();
  };
  return { deleteItem };
};
