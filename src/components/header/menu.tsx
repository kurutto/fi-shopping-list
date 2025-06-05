"use client";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import { useMenuItems } from "@/hooks/useMenuItems";
import MenuItem from "./menuItem";

interface MenuProps extends Omit<ComponentPropsWithoutRef<"ul">, "className"> {
  fridgeId: string;
  className?: string;
}
const Menu = ({ fridgeId, className, ...props }: MenuProps) => {
  const { menuItems } = useMenuItems(fridgeId);
  const baseStyle = "max-md:hidden flex md:gap-6 lg:gap-7 max-lg:text-sm";
  return (
    <ul className={cn(baseStyle, className)} {...props}>
      {menuItems.map((menuItem, idx) => (
        <MenuItem href={menuItem.link} onClick={menuItem.func} key={idx}>
          {menuItem.title}
        </MenuItem>
      ))}
    </ul>
  );
};

export default Menu;
