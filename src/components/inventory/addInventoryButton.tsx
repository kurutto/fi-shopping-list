"use client";
import React, { useContext } from "react";
import Button from "../ui/button";
import { ModalContext, ModalContextType } from "@/context/modalContext";

const AddInventoryButton = () => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  return (
    <Button
      variant="add"
      color="primary"
      onClick={() => handleItemOpen(1)}
      aria-label="在庫管理追加"
    />
  );
};

export default AddInventoryButton;
