import React from "react";
import Overlay from "./overlay";
import Box from "./box";
import { cn } from "@/lib/utils";
import CloseButton from "./closeButton";

interface ModalProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  isOpen: boolean;
  handleOpen: () => void;
  boxW?: string;
  children: React.ReactNode;
  className?: string;
  closeButton?:boolean;
}

const Modal = ({
  isOpen = false,
  handleOpen,
  boxW,
  children,
  className,
  closeButton = true,
  ...props
}: ModalProps) => {
  const baseStyle = cn(
    "fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50",
    isOpen ? "visible opacity-100" : "invisible opacity-0"
  );
  const boxStyle = cn(
    "absolute transition-opacity max-h-[calc(100vh-2rem)] overscroll-contain overflow-y-auto -mx-4 max-w-14/15 z-55 my-1",
    boxW,
    isOpen ? "visible opacity-100" : "invisible opacity-0"
  );
  return (
    <div className={cn(baseStyle, className)} {...props}>
      <Overlay isOpen={isOpen} handleOpen={handleOpen} />
      <Box variant="rounded" className={boxStyle}>
        {closeButton && <CloseButton
          handleOpen={handleOpen}
          className="ml-auto md:-mr-4 md:-mt-4 mb-0"
        />}
        {children}
      </Box>
    </div>
  );
};

export default Modal;
