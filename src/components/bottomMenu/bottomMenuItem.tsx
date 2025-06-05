import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

interface BottomMenuItemProps
  extends Omit<ComponentPropsWithoutRef<"li">, "className"> {
  className?: string;
  href?: string;
  icon: React.ElementType;
  children: React.ReactNode;
}
const BottomMenuItem = ({
  className,
  icon: Icon,
  href,
  children,
  ...props
}: BottomMenuItemProps) => {
  const Tag: React.ElementType = href ? Link : "div";
  const tagProps = Tag === Link ? { href } : {};
  const baseStyle = "";

  return (
    <li className={cn(baseStyle, className)} {...props}>
      <Tag className="block py-2 text-center cursor-pointer" {...tagProps}>
        <div className="w-fit mx-auto">
          <Icon className="text-xl" />
        </div>
        <div className="text-xs">{children}</div>
      </Tag>
    </li>
  );
};

export default BottomMenuItem;
