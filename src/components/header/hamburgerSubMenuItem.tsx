import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import HamburgerMenuLink from "./hamburgerMenuLink";

interface HamburgerSubMenuItemProps
  extends Omit<ComponentPropsWithoutRef<"li">, "className"> {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const HamburgerSubMenuItem = ({
  href,
  children,
  className,
  ...props
}: HamburgerSubMenuItemProps) => {
  const baseStyle = "pt-2 pl-3";
  const Tag: React.ElementType = href ? HamburgerMenuLink : "div";
  const tagProps = Tag === HamburgerMenuLink ? { href } : {};

  return (
    <li className={cn(baseStyle, className)} {...props}>
      <Tag className="hover:opacity-65 cursor-pointer" {...tagProps}>
        -&nbsp;{children}
      </Tag>
    </li>
  );
};

export default HamburgerSubMenuItem;
