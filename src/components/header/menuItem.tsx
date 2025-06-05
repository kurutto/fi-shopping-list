import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

interface MenuItemProps
  extends Omit<ComponentPropsWithoutRef<"li">, "className"> {
  href?: string;
  children: React.ReactNode;
  className?: string;
}
const MenuItem = ({ href, children, className, ...props }: MenuItemProps) => {
  const baseStyle =
    "hover:opacity-65 cursor-pointer transition-opacity";
  const Tag: React.ElementType = href ? Link : "div";
  const tagProps = Tag === Link ? { href } : {};

  return (
    <li className={cn(baseStyle, className)} {...props}>
      <Tag className="block" {...tagProps}>
        {children}
      </Tag>
    </li>
  );
};

export default MenuItem;
