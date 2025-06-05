import { networkErrorMessage } from "@/constants/messages";
import { putData } from "@/lib/putData";
import { DataType } from "@/types/types";
import { useRouter } from "next/navigation";

export const useUpdateDataFromModal = () => {
  const router = useRouter();
  const updateItem = async (
    fetchPath: string,
    data: DataType,
    reset: () => void,
    handleOpen: () => void
  ) => {
    try {
      const res = await putData(fetchPath, data);
      const resData = await res.json();
      if (!res.ok) {
        alert(resData.message);
      }
      reset();
      router.refresh();
      handleOpen();
    } catch {
      alert(networkErrorMessage);
    }
  };
  return { updateItem };
};
