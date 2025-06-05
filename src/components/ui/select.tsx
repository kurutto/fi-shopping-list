import { cn } from "@/lib/utils";
import React from "react";

interface SelectProps
  extends Omit<React.ComponentPropsWithRef<"select">, "className"> {
  padding?: "base" | "small";
  className?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ padding = "base", className, ...props }, ref) => {
    const baseStyle = cn(
      "rounded-md border border-light-gray bg-white outline-none",
      padding === "base" && "p-2",
      padding === "small" && "md:px-2 md:py-1.5 max-md:px-1 max-md:py-0.5"
    );
    return (
      <select className={cn(baseStyle, className)} {...props} ref={ref} />
    );
  }
);

Select.displayName = "Select";

export default Select;
