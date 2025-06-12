"use client";
import { InventoryType, ReceiptDataType } from "@/types/types";
import { createContext, useState } from "react";

export interface ModalContextType {
  item?: number | null;
  isOpen: boolean;
  inventory?: InventoryType | null;
  purchases?: ReceiptDataType[] | null;
  handleItemOpen: (
    itemNumber: number,
    inventory?: InventoryType,
    purchases?: ReceiptDataType[]
  ) => void;
  handleOpen: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  item: null,
  isOpen: false,
  inventory: null,
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
  const [inventory, setInventory] = useState<InventoryType | null>(null);
  const [purchases, setPurchases] = useState<ReceiptDataType[] | null>(null);
  const handleItemOpen = (
    itemNumber: number,
    inventoryItem?: InventoryType | null,
    purchasesItems?: ReceiptDataType[] | null
  ) => {
    setItem(itemNumber);
    if (inventoryItem) {
      setInventory(inventoryItem);
    }
    if (purchasesItems) {
      setPurchases(purchasesItems);
    }
    setIsOpen((prev) => !prev);
  };
  const handleOpen = () => {
    if (isOpen) {
      setItem(null);
      setInventory(null);
      setPurchases(null);
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <ModalContext.Provider
      value={{
        item,
        isOpen,
        inventory,
        purchases,
        handleItemOpen,
        handleOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
