"use client";
import { useContext } from "react";
import Modal from "../ui/modal";
import AddToListForm from "../shopping-list/addToListForm";
import { ModalContext, ModalContextType } from "@/context/modalContext";
import InventoryForm from "../inventory/inventoryForm";
import PurchaseFromReceipt from "../purchase/purchaseFromReceipt";
import PurchaseRegistration from "../purchase/purchaseRegistration";
import PurchaseFromProduct from "../purchase/purchaseFromProduct";

interface FridgeModal {
  userId: string;
  fridgeId: string;
}

const FridgeModal = ({ userId, fridgeId }: FridgeModal) => {
  const { item, isOpen, inventory, purchases, handleOpen } =
    useContext<ModalContextType>(ModalContext);
  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen} boxW="w-lg">
      {item === 0 && <AddToListForm userId={userId} fridgeId={fridgeId} />}
      {item === 1 && (
        <InventoryForm fridgeId={fridgeId} inventory={inventory} />
      )}
      {item === 2 && (
        <PurchaseRegistration userId={userId} fridgeId={fridgeId} />
      )}
      {item === 3 && purchases && (
        <PurchaseFromReceipt
          userId={userId}
          fridgeId={fridgeId}
          purchases={purchases}
        />
      )}
      {item === 4 && purchases && (
        <PurchaseFromProduct
          userId={userId}
          fridgeId={fridgeId}
          purchases={purchases}
        />
      )}
    </Modal>
  );
};

export default FridgeModal;
