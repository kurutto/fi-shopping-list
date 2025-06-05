import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants";

interface ListProps
  extends Omit<React.ComponentPropsWithoutRef<"ul">, "className"> {
  variant?: "ul" | "ol";
  space?: "base" | "lg" | "none";
  className?: string;
}
const List = ({
  variant = "ul",
  space = "base",
  className,
  ...props
}: ListProps) => {
  const Tag: React.ElementType = variant === "ol" ? "ol" : "ul";
  const list = tv({
    base: " ml-4",
    variants: {
      variant: {
        ul: "-indent-4",
        ol: "list-decimal",
      },
      space: {
        base: "space-y-1.5",
        lg: "space-y-2.5",
        none: "",
      },
    },
    defaultVariants: {
      variant: "ul",
      space: "base",
    },
  });

  return (
    <Tag
      className={cn(list({ variant: variant, space: space }), className)}
      {...props}
    />
  );
};

interface LiProps
  extends Omit<React.ComponentPropsWithoutRef<"li">, "className"> {
  className?: string;
}
const Li = ({ className, ...props }: LiProps) => {
  return <li className={className} {...props} />;
};

export { List, Li };
