import { networkErrorMessage } from "@/constants/messages";
import { postData } from "@/lib/postData";
import { DataType } from "@/types/types";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const useCreateDataFromModal = () => {
  const router = useRouter();
  const [isAdded, setIsAdded] = useState("");
  const pathname = usePathname();
  const createItem = async (
    fetchPath: string,
    data: DataType,
    reset: () => void,
    fridgeId: string,
    postName: string,
    handleOpen: () => void
  ) => {
    try {
      await postData(fetchPath, data);
      reset();
      router.refresh();
      if (
        pathname.split(`${fridgeId}/`)[1] ||
        (pathname.split("member/")[1] &&
          pathname.split("member/")[1] !== fridgeId)
      ) {
        setIsAdded(`${postName}が追加されました`);
        setTimeout(() => {
          handleOpen();
        }, 1500);
      } else {
        handleOpen();
      }
    } catch {
      alert(networkErrorMessage);
    }
  };
  return { isAdded, createItem };
};
