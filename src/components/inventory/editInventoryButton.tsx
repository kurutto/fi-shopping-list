"use client";
import React, { useContext } from "react";
import Button from "../ui/button";
import { ModalContext, ModalContextType } from "@/context/modalContext";
import { InventoryType } from "@/types/types";

const EditInventoryButton = ({ inventory }: { inventory: InventoryType }) => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  return (
    <Button
      size="small"
      color="secondary"
      className="sm:w-20 max-sm:w-11"
      onClick={() => handleItemOpen(1, inventory)}
    >
      編集
    </Button>
  );
};

export default EditInventoryButton;
