import { cn } from "@/lib/utils";
import React from "react";

interface BoxProps
  extends Omit<React.ComponentPropsWithoutRef<"p">, "className"> {
  variant?: "error";
  color?: "gray" | "destructive";
  className?: string;
}

const Paragraph = ({ variant, color, className, ...props }: BoxProps) => {
  const baseStyle = cn(
    variant === "error" && "text-xs text-destructive",
    color === "gray" && "text-gray",
    color === "destructive" && "text-destructive"
  );
  return <p className={cn(baseStyle, className)} {...props} />;
};

export default Paragraph;
