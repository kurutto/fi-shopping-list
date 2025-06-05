"use client";
import { useContext } from "react";
import Button from "../ui/button";
import { ModalContext, ModalContextType } from "@/context/modalContext";

const AddToListButton = () => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  return (
    <Button
      variant="add"
      color="primary"
      onClick={() => handleItemOpen(0)}
      aria-label="買物リスト追加"
    />
  );
};

export default AddToListButton;
