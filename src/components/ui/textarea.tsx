import { cn } from "@/lib/utils";
import React from "react";

interface TextareaProps
  extends Omit<React.ComponentPropsWithRef<"textarea">, "className"> {
  padding?: "base" | "small";
  className?: string;
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ padding = "base", className, ...props }, ref) => {
    const baseStyle = cn(
      "rounded-md border border-light-gray bg-white outline-none",
      padding === "base" && "p-2",
      padding === "small" && "md:px-2 md:py-1.5 max-md:px-1 max-md:py-0.5"
    );
    return (
      <textarea {...props} ref={ref} className={cn(baseStyle, className)} />
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
