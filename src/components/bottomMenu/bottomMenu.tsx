"use client";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { useMenuItems } from "@/hooks/useMenuItems";
import BottomMenuItem from "./bottomMenuItem";

interface BottomMenuProps
  extends Omit<ComponentPropsWithoutRef<"ul">, "className"> {
  fridgeId: string;
  className?: string;
}
const BottomMenu = ({ fridgeId, className, ...props }: BottomMenuProps) => {
  const { menuItems } = useMenuItems(fridgeId);
  const baseStyle =
    "grid grid-cols-4 bg-white z-25 shadow-[0_-5px_7px_rgba(0,0,0,0.05)]";
  return (
    <>
      <ul className={cn(baseStyle, className)} {...props}>
        {menuItems.map((menuItem, idx) => (
          <BottomMenuItem
            key={idx}
            icon={menuItem.icon}
            onClick={menuItem.func}
            href={menuItem.link}
          >
            {menuItem.title}
          </BottomMenuItem>
        ))}
      </ul>
    </>
  );
};

export default BottomMenu;
