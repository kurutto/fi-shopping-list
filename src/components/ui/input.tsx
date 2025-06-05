import { cn } from "@/lib/utils";
import React from "react";

interface InputProps
  extends Omit<React.ComponentPropsWithRef<"input">, "className"> {
  type: string;
  padding?: "base" | "small";
  className?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, padding = "base", className, ...props }, ref) => {
    const baseStyle = cn(
      "rounded-md border border-light-gray bg-white outline-none",
      padding === "base" && "p-2",
      padding === "small" && "md:px-2 md:py-1.5 max-md:px-1 max-md:py-0.5",
      type === "checkbox" && "w-4 h-4 accent-primary"
    );
    return (
      <input
        type={type}
        className={cn(baseStyle, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input"

export default Input;
