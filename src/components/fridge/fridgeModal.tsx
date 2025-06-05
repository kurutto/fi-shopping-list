"use client";
import { useContext } from "react";
import Modal from "../ui/modal";
import AddToListForm from "../shopping-list/addToListForm";
import { ModalContext, ModalContextType } from "@/context/modalContext";
import InventoryForm from "../inventory/inventoryForm";
import PurchaseForm from "../purchase/purchaseForm";

interface FridgeModal {
  userId: string;
  fridgeId: string;
}

const FridgeModal = ({ userId, fridgeId }: FridgeModal) => {
  const { item, isOpen, inventory, handleOpen } =
    useContext<ModalContextType>(ModalContext);
  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen} boxW="w-lg">
      {item === 0 && <AddToListForm userId={userId} fridgeId={fridgeId} />}
      {item === 1 && (
        <InventoryForm fridgeId={fridgeId} inventory={inventory} />
      )}
      {item === 2 && <PurchaseForm userId={userId} fridgeId={fridgeId} />}
    </Modal>
  );
};

export default FridgeModal;
