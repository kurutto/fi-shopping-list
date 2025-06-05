import React, { useRef } from "react";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import Label from "../ui/label";
import Input from "../ui/input";
import Modal from "../ui/modal";
interface DeleteConfirmProps {
  isOpen: boolean;
  handleOpen: () => void;
  confirmText: string;
  hideNextTime: boolean;
  handleDelete: (data: boolean | null) => Promise<void>;
}
const DeleteConfirm = ({
  isOpen,
  handleOpen,
  confirmText,
  hideNextTime,
  handleDelete,
}: DeleteConfirmProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Modal
      isOpen={isOpen}
      handleOpen={handleOpen}
      boxW="w-lg"
      className="text-center"
    >
      <Paragraph className="whitespace-pre-wrap">{confirmText}</Paragraph>
      {hideNextTime && (
        <Label className="align-middle">
          <Input type="checkbox" ref={inputRef} className="mr-2" />
          次回から表示しない
        </Label>
      )}
      <div className="flex gap-4 justify-center">
        <Button
          color="outline"
          onClick={() =>
            handleDelete(inputRef?.current ? inputRef?.current.checked : null)
          }
          className="w-30"
        >
          OK
        </Button>
        <Button color="secondary" onClick={() => handleOpen()} className="w-30">
          キャンセル
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirm;
