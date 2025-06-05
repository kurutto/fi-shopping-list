import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import { FaXmark } from "react-icons/fa6";

interface CloseButtonProps
  extends Omit<ComponentPropsWithoutRef<"div">, "className"> {
  handleOpen: () => void;
  className?: string;
}

const CloseButton = ({ className, handleOpen, ...props }: CloseButtonProps) => {
  const baseStyle = "w-fit md:cursor-pointer";
  return (
    <div
      className={cn(baseStyle, className)}
      onClick={()=>handleOpen()}
      {...props}
    >
      <FaXmark className="md:text-4xl max-md:text-3xl" />
    </div>
  );
};

export default CloseButton;
