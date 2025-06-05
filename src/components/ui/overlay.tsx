import { cn } from "@/lib/utils";
import React from "react";

interface OverlayProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  isOpen: boolean;
  handleOpen:() => void;
  className?: string;
}
const Overlay = ({ isOpen = false, handleOpen, className, ...props }: OverlayProps) => {
  const baseStyle = cn(
    "fixed h-screen w-screen top-0 right-0 transition-opacity  z-40",
    isOpen ? "visible opacity-50 bg-black" : "invisible opacity-0"
  );
  return <div className={cn(baseStyle, className)} {...props} onClick={()=>handleOpen()} />;
};

export default Overlay;
