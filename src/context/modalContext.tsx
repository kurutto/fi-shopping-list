"use client";
import type { mutate } from 'swr'
import { InventoryType, PurchaseItemDataType } from "@/types/types";
import { createContext, RefObject, useRef, useState } from "react";

export interface ModalContextType {
  item?: number | null;
  isOpen: boolean;
  inventory?: InventoryType | null;
  purchases?: PurchaseItemDataType[] | null;
  handleItemOpen: (
    itemNumber: number,
    inventory?: InventoryType,
    purchases?: PurchaseItemDataType[],
    mutateFunc?:typeof mutate,
  ) => void;
  handleOpen: () => void;
  mutateRef:RefObject<(typeof mutate | undefined) | undefined>;
}

export const ModalContext = createContext<ModalContextType>({
  item: null,
  isOpen: false,
  inventory: null,
  handleItemOpen: () => {},
  handleOpen: () => {},
  mutateRef:{ current: undefined }
});

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [item, setItem] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inventory, setInventory] = useState<InventoryType | null>(null);
  const [purchases, setPurchases] = useState<PurchaseItemDataType[] | null>(null);
  const mutateRef = useRef<(typeof mutate | undefined) | undefined>(undefined);
  const handleItemOpen = (
    itemNumber: number,
    inventoryItem?: InventoryType | null,
    purchasesItems?: PurchaseItemDataType[] | null,
    mutateFunc?:typeof mutate,
  ) => {
    setItem(itemNumber);
    mutateRef.current= mutateFunc;
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
        mutateRef
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
