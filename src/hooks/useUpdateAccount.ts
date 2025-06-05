import { putData } from "@/lib/putData";
import { DataType, SessionUpdateDataType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useHandleOpen } from "./useHandleOpen";
import { useHandleEdit } from "./useHandleEdit";
import { networkErrorMessage } from "@/constants/messages";

export const useUpdateAccount = () => {
  const { update } = useSession();
  const { isOpen, handleOpen } = useHandleOpen();
  const { isEdit, handleEdit } = useHandleEdit();
  const router = useRouter();
  const updateAccount = async (
    fetchPath: string,
    data: DataType,
    setError: (
      name: "id",
      error: { type: string; message?: string | undefined }
    ) => void,
    sessionUpdateData: SessionUpdateDataType,
    fridgeAccount = false
  ) => {
    try {
      const res = await putData(fetchPath, data);
      const resData = await res.json();
      if (!res.ok) {
        if (resData.errorId === "INVALID_ID") {
          setError("id", {
            type: "server",
            message: resData.message,
          });
        } else {
          alert(resData.message);
        }
      } else {
        handleEdit(false);
        await update(sessionUpdateData);
        router.refresh();
        if (fridgeAccount && data.id) {
          router.push(`/member/${data.id}/account`);
        }
        handleOpen(true);
        setTimeout(() => {
          handleOpen(false);
        }, 2000);
      }
    } catch {
      alert(networkErrorMessage);
    }
  };
  return { updateAccount, isOpen, handleOpen, isEdit, handleEdit };
};
