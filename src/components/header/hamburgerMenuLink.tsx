import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HamburgerMenuLinkProps
  extends Omit<ComponentPropsWithoutRef<typeof Link>, "className"> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const HamburgerMenuLink = ({
  href,
  children,
  className,
  ...props
}: HamburgerMenuLinkProps) => {
  const baseStyle = "block hover:opacity-65 cursor-pointer";

  return (
    <Link href={href} className={cn(baseStyle, className)} {...props}>
      {children}
    </Link>
  );
};

export default HamburgerMenuLink;
