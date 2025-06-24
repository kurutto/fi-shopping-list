import { cn } from "@/lib/utils";

interface headingProps
  extends Omit<React.ComponentPropsWithoutRef<"h1">, "className"> {
  level?: 1 | 2 | 3 | 4;
  icon?: React.ElementType;
  outline?: boolean;
  spBgWhite?: boolean;
  children: React.ReactNode;
  className?: string;
}
const Heading = ({
  level = 3,
  icon: Icon,
  outline = false,
  spBgWhite = false,
  children,
  className,
  ...props
}: headingProps) => {
  const Tag: React.ElementType = `h${level}`;
  const baseStyle = cn(
    level === 1 &&
      "flex items-center justify-center font-bold md:text-2xl md:gap-4 max-md:text-xl max-md:gap-2.5",
    level === 2 &&
      cn(
        "flex items-center font-bold text-xl gap-4",
        outline &&
          "bg-white rounded-2xl md:py-5 md:px-7 max-md:py-3.5 max-md:px-3.5",
        outline && (spBgWhite ? "shadow" : " md:shadow-pc max-md:shadow-sp")
      ),
    level === 3 && "font-bold text-lg",
    level === 4 && "font-bold text-base"
  );
  const iconStyle = cn(
    level === 1 && "md:text-3xl max-md:text-2xl",
    level === 2 && "text-2xl"
  );

  return (
    <Tag className={cn(baseStyle, className)} {...props}>
      {Icon && <Icon className={iconStyle} />}
      {children}
    </Tag>
  );
};

export default Heading;
