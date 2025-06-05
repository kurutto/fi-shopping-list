import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import HamburgerMenuLink from "./hamburgerMenuLink";

interface HamburgerMenuItemProps
  extends Omit<ComponentPropsWithoutRef<"li">, "className"> {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const HamburgerMenuItem = ({
  href,
  children,
  className,
  ...props
}: HamburgerMenuItemProps) => {
  const baseStyle = "border-b-2 border-dashed border-secondary";
  const Tag: React.ElementType = href ? HamburgerMenuLink : "div";
  const tagProps = Tag === HamburgerMenuLink ? { href } : {};

  return (
    <li className={cn(baseStyle, className)} {...props}>
      <Tag className="p-4" {...tagProps}>
        {children}
      </Tag>
    </li>
  );
};

export default HamburgerMenuItem;
