"use client";
import { InventoryType } from "@/types/types";
import { createContext, useState } from "react";

export interface ModalContextType {
  item?: number | null;
  isOpen: boolean;
  inventory?:InventoryType | null;
  handleItemOpen: (itemNumber: number,inventory?:InventoryType | null) => void;
  handleOpen: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  item: null,
  isOpen: false,
  inventory:null,
  handleItemOpen: () => {},
  handleOpen: () => {},
});

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [item, setItem] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inventory, setInventory] = useState<InventoryType | null | undefined>(null)
  const handleItemOpen = (itemNumber: number,inventoryItem?:InventoryType | null) => {
    setItem(itemNumber);
    if(inventoryItem){
      setInventory(inventoryItem)
    }
    setIsOpen((prev) => !prev);
  };
  const handleOpen = () => {
    if(isOpen){
      setItem(null);
      setInventory(null);
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <ModalContext.Provider value={{ item, isOpen, inventory, handleItemOpen, handleOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
