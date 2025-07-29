import { mutate } from "swr";
import { networkErrorMessage } from "@/constants/messages";
import { putData } from "@/lib/putData";
import { DataType } from "@/types/types";

export const useUpdateDataFromModal = () => {
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
      mutate(`${process.env.NEXT_PUBLIC_API_URL}${fetchPath}`);
      handleOpen();
    } catch {
      alert(networkErrorMessage);
    }
  };
  return { updateItem };
};
