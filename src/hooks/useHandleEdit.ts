import { useState } from "react";

export const useHandleEdit = () => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = (edit:boolean) => {
    setIsEdit(edit);
  };
  return { isEdit, handleEdit };
};
