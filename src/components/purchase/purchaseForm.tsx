import { useContext, useRef, useState } from "react";
import Box from "../ui/box";
import Button from "../ui/button";
import Input from "../ui/input";
import Label from "../ui/label";
import Paragraph from "../ui/paragraph";
import Select from "../ui/select";
import AmountInput from "../ui/amountInput";
import { categories } from "@/constants/categories";
import { useAddPurchase } from "./hooks/useAddPurchase";
import { PurchaseItemDataType } from "@/types/types";
import { ModalContext, ModalContextType } from "@/context/modalContext";
import { useRegisterItemValidation } from "./hooks/useRegisterItemValidation";
import { useRouter } from "next/navigation";
import { getKana } from "@/lib/inventory";

interface PurchaseFormProps {
  userId: string;
  fridgeId: string;
  purchases?: PurchaseItemDataType[];
}

const PurchaseForm = ({ userId, fridgeId, purchases }: PurchaseFormProps) => {
  const { handleOpen } = useContext<ModalContextType>(ModalContext);
  const { inventories, addPurchase } = useAddPurchase(fridgeId);
  const router = useRouter();
  const [name, setName] = useState(purchases ? purchases[0].name : "");
  const [category, setCategory] = useState(
    purchases ? purchases[0].category.toString() : "0"
  );
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [addInventory, setAddInventory] = useState(false);
  const [inventoryRegistration, setInventoryRegistration] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retouching, setRetouching] = useState(purchases ? false : true);
  const [isAdded, setIsAdded] = useState("");
  const existingNameRef = useRef<HTMLSelectElement | null>(null);
  const existingAmountRef = useRef<HTMLInputElement | null>(null);
  const newNameRef = useRef<HTMLInputElement | null>(null);
  const newAmountRef = useRef<HTMLInputElement | null>(null);
  const {
    registerItemValidation,
    nameErr,
    existingNameErr,
    existingAmountErr,
    newNameErr,
    newAmountErr,
  } = useRegisterItemValidation(
    fridgeId,
    name,
    addInventory,
    inventoryRegistration,
    existingNameRef,
    existingAmountRef,
    newNameRef,
    newAmountRef
  );

  const handleAddInventory = () => {
    if (addInventory) {
      [existingNameRef, existingAmountRef, newNameRef, newAmountRef].forEach(
        (ref) => {
          if (ref.current) ref.current.value = "";
        }
      );
      setInventoryRegistration("");
    }
    setAddInventory((prev) => !prev);
  };

  const handleInventoryRegistration = (value: string) => {
    [existingNameRef, existingAmountRef, newNameRef, newAmountRef].forEach(
      (ref) => {
        if (ref.current) ref.current.value = "";
      }
    );
    setInventoryRegistration(value);
  };

  const handleRegisterItem = async () => {
    const { hasErr } = await registerItemValidation();
    let kana;
    if (newNameRef.current?.value) {
      kana = await getKana(fridgeId, newNameRef.current.value);
    }
    if (!hasErr) {
      setIsSubmitting(true);
      try {
        addPurchase(
          addInventory,
          {
            name: name,
            category: category,
            date: date,
            inventoryId:
              addInventory && inventoryRegistration === "0"
                ? existingNameRef.current!.value
                : "",
            inventoryName:
              addInventory && inventoryRegistration === "1"
                ? newNameRef.current!.value
                : "",
            amount:
              addInventory && inventoryRegistration === "0"
                ? Number(existingAmountRef.current?.value)
                : addInventory && inventoryRegistration === "1"
                ? Number(newAmountRef.current?.value)
                : 0,
          },
          userId,
          kana
        );
        setIsAdded(`${name}が追加されました`);
        setIsSubmitting(false);
        handleOpen();
        router.refresh();
      } catch {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <>
      {isAdded && <Paragraph className="text-center">{isAdded}</Paragraph>}
      <Box variant="spaceY">
        <Box variant="horizontally">
          <Label className="w-20">
            品名<span className="text-destructive pl-0.5">*</span>
          </Label>
          <div className="flex-1">
            {retouching ? (
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            ) : (
              <Paragraph className="mt-2.5">{name}</Paragraph>
            )}
            {nameErr && <Paragraph variant="error">{nameErr}</Paragraph>}
          </div>
        </Box>
        <Box variant="horizontally">
          <Label className="w-20">
            カテゴリ<span className="text-destructive pl-0.5">*</span>
          </Label>
          <div className="sm:flex-1">
            {retouching ? (
              <Select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1"
              >
                {categories.map((category, idx) => (
                  <option value={idx} key={idx}>
                    {category}
                  </option>
                ))}
              </Select>
            ) : (
              <Paragraph className="mt-2.5">
                {categories[Number(category)]}
              </Paragraph>
            )}
          </div>
        </Box>
        <Box variant="horizontally">
          <Label htmlFor="date" className="w-20">
            購入日
          </Label>

          {retouching ? (
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          ) : (
            <Paragraph className="mt-2.5">{date}</Paragraph>
          )}
        </Box>
        {purchases && (
          <Button
            type="button"
            color="secondary"
            onClick={() => setRetouching((prev) => !prev)}
            className="w-45 mx-auto"
          >
            {retouching ? "保存" : "編集"}
          </Button>
        )}
        <Box variant="horizontally" className="items-center">
          <Label htmlFor="inventoryCheck">在庫管理に追加</Label>
          <Input
            type="checkbox"
            id="inventoryCheck"
            checked={addInventory}
            onChange={handleAddInventory}
          />
        </Box>
        {addInventory && (
          <>
            <div className="flex w-full flex-wrap">
              <label className="w-full mb-1 ml-2 block">
                <Input
                  type="radio"
                  name="inventoryRegistration"
                  value={0}
                  onChange={(e) => handleInventoryRegistration(e.target.value)}
                  className="mr-1"
                />
                既存の在庫品に登録
              </label>
              {inventoryRegistration === "0" && (
                <>
                  {inventories.length === 0 ? (
                    <Paragraph className="ml-4">
                      在庫管理品がありません。「新規に在庫品を登録」から登録を行なってください。
                    </Paragraph>
                  ) : (
                    <>
                      <Select
                        id="inventoryId"
                        ref={existingNameRef}
                        className="flex-1 ml-4"
                      >
                        <option value="">選択</option>
                        {inventories?.map((inventory, idx) => (
                          <option value={inventory.id} key={idx}>
                            {inventory.name}({categories[inventory.category]})
                          </option>
                        ))}
                      </Select>
                      {existingNameErr && (
                        <Paragraph variant="error" className="w-full ml-4">
                          {existingNameErr}
                        </Paragraph>
                      )}
                      <Input
                        type="text"
                        id="amount"
                        ref={existingAmountRef}
                        className="w-17 ml-3 text-center"
                        placeholder="追加数"
                      />
                      {existingAmountErr && (
                        <Paragraph variant="error" className="w-full ml-4">
                          {existingAmountErr}
                        </Paragraph>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <div className="flex w-full flex-wrap">
              <label className="w-full mb-1 ml-2">
                <Input
                  type="radio"
                  name="inventoryRegistration"
                  value={1}
                  onChange={(e) => handleInventoryRegistration(e.target.value)}
                  className="mr-1"
                />
                新規に在庫品を登録
              </label>
              {inventories.length === 0 &&
                existingNameErr &&
                inventoryRegistration != "1" && (
                  <Paragraph variant="error" className="ml-4">
                    {existingNameErr}
                  </Paragraph>
                )}
              {inventoryRegistration === "1" && (
                <>
                  <Box variant="horizontally" className="ml-4">
                    <Label htmlFor="inventoryName" className="w-24">在庫管理品名</Label>
                    <div>
                    <Input
                      id="inventoryName"
                      type="text"
                      ref={newNameRef}
                      placeholder="在庫管理品名"
                      className="flex-1"
                    />
                    {newNameErr && (
                      <Paragraph variant="error">{newNameErr}</Paragraph>
                    )}
                    </div>
                  </Box>
                  <Box variant="horizontally" className="ml-4 mt-2">
                    <Label className="w-24">追加数</Label>
                    <div>
                    <AmountInput ref={newAmountRef} />
                    {newAmountErr && (
                      <Paragraph variant="error">{newAmountErr}</Paragraph>
                    )}
                    </div>
                  </Box>
                  {/* <Input
                    type="text"
                    id="amount"
                    ref={newAmountRef}
                    placeholder="追加数"
                    className="w-17 ml-3 text-center"
                  /> */}
                  
                </>
              )}
            </div>
          </>
        )}
      </Box>
      <Box
        variant="horizontally"
        className="md:mt-8 max-md:mt-6 justify-center"
      >
        <Button
          color="primary"
          className="w-45"
          disabled={isSubmitting}
          onClick={handleRegisterItem}
        >
          {isSubmitting ? "登録中" : "登録"}
        </Button>
      </Box>
    </>
  );
};

export default PurchaseForm;
