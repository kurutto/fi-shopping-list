import { RefObject, useState } from "react";
import {
  toHalfWidthNumber,
  validateHalfWidthNumber,
} from "@/lib/toHalfWidthNumberAndValidate";
import { getKana } from "@/lib/inventory";

export const useRegisterItemValidation = (
  fridgeId: string,
  name: string,
  addInventory: boolean,
  inventoryRegistration: string,
  existingNameRef: RefObject<HTMLSelectElement | null>,
  existingAmountRef: RefObject<HTMLInputElement | null>,
  newNameRef: RefObject<HTMLInputElement | null>,
  newAmountRef: RefObject<HTMLInputElement | null>
) => {
  const [nameErr, setNameErr] = useState("");
  const [existingNameErr, setExistingNameErr] = useState("");
  const [existingAmountErr, setExistingAmountErr] = useState("");
  const [newNameErr, setNewNameErr] = useState("");
  const [newAmountErr, setNewAmountErr] = useState("");

  const registerItemValidation = async () => {
    let kana = "";
    let hasErr = false;

    const trimName = name.trim();
    if (trimName === "") {
      setNameErr("必須項目です");
      hasErr = true;
    }
    if (addInventory) {
      if (inventoryRegistration === "0") {
        const trimInventoryName = existingNameRef.current?.value.trim();
        if (trimInventoryName === "") {
          setExistingNameErr("必須項目です");
          hasErr = true;
        }
        const trimInventoryAmount = existingAmountRef?.current?.value.trim();
        if (trimInventoryAmount) {
          const setErr = () => {
            setExistingAmountErr("数字以外の文字が含まれています");
            hasErr = true;
          };
          const halfWidthNumber = toHalfWidthNumber(trimInventoryAmount);
          existingAmountRef.current!.value = halfWidthNumber;
          validateHalfWidthNumber(halfWidthNumber, setErr);
        }
      }
      if (inventoryRegistration === "1") {
        if (newNameRef.current?.value) {
          kana = await getKana(fridgeId, newNameRef.current.value);
        }
        const trimInventoryName = newNameRef.current?.value.trim();
        if (trimInventoryName === "") {
          setNewNameErr("必須項目です");
          hasErr = true;
        }
        const trimInventoryAmount = newAmountRef.current?.value.trim();
        if (trimInventoryAmount) {
          const setErr = () => {
            setNewAmountErr("数字以外の文字が含まれています");
            hasErr = true;
          };
          const halfWidthNumber = toHalfWidthNumber(trimInventoryAmount);
          newAmountRef.current!.value = halfWidthNumber;
          validateHalfWidthNumber(halfWidthNumber, setErr);
        }
      }
    }
    return {kana, hasErr};
  };

  return {
    registerItemValidation,
    nameErr,
    existingNameErr,
    existingAmountErr,
    newNameErr,
    newAmountErr,
  };
};
