import { cn } from "@/lib/utils";

interface LabelProps
  extends Omit<React.ComponentPropsWithoutRef<"label">, "className"> {
  variant?: "base" | "check";
  className?: string;
}
const Label = ({ variant = "base", className, ...props }: LabelProps) => {
  const baseStyle = cn(
    variant === "base" && "block leading-11",
    variant === "check" && "-indent-4 ml-4 mb-1 leading-6 align-middle inline-block"
  );

  return <label className={cn(baseStyle, className)} {...props} />;
};

export default Label;
