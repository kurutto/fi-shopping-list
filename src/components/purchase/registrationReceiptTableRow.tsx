import { TableRow, TableData } from "@/components/ui/table";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { ReceiptDataType } from "@/types/types";
import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { categories } from "@/constants/categories";
import { useAddPurchase } from "./hooks/useAddPurchase";
import { getKana } from "@/lib/inventory";
import Paragraph from "../ui/paragraph";
export interface RegisterItemDataType {
  addInventory: boolean;
  inventoryRegistration: string;
  data: {
    name: string;
    category: string;
    date: string;
    inventoryId: string;
    inventoryName: string;
    amount: number;
  };
  kana: string;
}
export interface RegisterItemType {
  RegisterItem: () => Promise<null | RegisterItemDataType>;
}
interface RegistrationReceiptTableRowType {
  fridgeId: string;
  item: ReceiptDataType;
  date?: string;
}
const RegistrationReceiptTableRow = forwardRef<
  RegisterItemType,
  RegistrationReceiptTableRowType
>(({ fridgeId, item, date }, ref) => {
  const { inventories } = useAddPurchase(fridgeId);
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category.toString());
  const [retouching, setRetouching] = useState(false);
  const [addInventory, setAddInventory] = useState(false);
  const [inventoryRegistration, setInventoryRegistration] = useState("");
  const existingNameRef = useRef<HTMLSelectElement | null>(null);
  const existingAmountRef = useRef<HTMLInputElement | null>(null);
  const newNameRef = useRef<HTMLInputElement | null>(null);
  const newAmountRef = useRef<HTMLInputElement | null>(null);
  const [nameErr, setNameErr] = useState("");
  const [existingNameErr, setExistingNameErr] = useState("");
  const [newNameErr, setNewNameErr] = useState("");

  const handleInventoryRegistration = (elem: HTMLInputElement) => {
    setInventoryRegistration(elem.value);
  };

  useImperativeHandle(ref, () => ({
    RegisterItem: async () => {
      setNameErr("");
      setExistingNameErr("");
      setNewNameErr("");
      let kana;
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
        }
      }
      if (hasErr) {
        return null;
      } else {
        return {
          addInventory: addInventory,
          inventoryRegistration: inventoryRegistration,
          data: {
            name: name,
            category: category,
            date: date ? date : new Date().toISOString().split("T")[0],
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
          kana: kana,
        };
      }
    },
  }));

  return (
    <>
      <TableRow>
        <TableData>
          {retouching ? (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full box-border"
            />
          ) : (
            <>{name}</>
          )}
          {nameErr && <Paragraph variant="error">{nameErr}</Paragraph>}
        </TableData>
        <TableData className="text-center">
          {retouching ? (
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-17"
            >
              {categories.map((category, idx) => (
                <option value={idx} key={idx}>
                  {category}
                </option>
              ))}
            </Select>
          ) : (
            <>{categories[Number(category)]}</>
          )}
        </TableData>
        <TableData className="text-center">
          <Input
            type="checkbox"
            onChange={() => setAddInventory((prev) => !prev)}
          />
        </TableData>
        <TableData className="text-center">
          <Button
            size="small"
            color="secondary"
            className="w-11"
            onClick={() => setRetouching((prev) => !prev)}
          >
            {retouching ? "保存" : "修正"}
          </Button>
        </TableData>
      </TableRow>
      {addInventory && (
        <>
          <TableRow>
            <TableData colSpan={4}>
              <div className="flex w-full flex-wrap">
                <label className="w-full mb-1 ml-2 block">
                  <Input
                    type="radio"
                    name="inventoryRegistration"
                    value={0}
                    onChange={(e) => handleInventoryRegistration(e.target)}
                    className="mr-1"
                  />
                  既存の在庫品から選択
                </label>
                {inventoryRegistration === "0" && (
                  <>
                    <Select
                      id="inventoryId"
                      className="flex-1 ml-4"
                      ref={existingNameRef}
                    >
                      <option value="">選択</option>
                      {inventories?.map((inventory, idx) => (
                        <option value={inventory.id} key={idx}>
                          {inventory.name}({categories[inventory.category]})
                        </option>
                      ))}
                    </Select>
                    <Input
                      type="text"
                      id="amount"
                      className="w-17 ml-3 text-center"
                      placeholder="追加数"
                      ref={existingAmountRef}
                    />
                    {existingNameErr && (
                      <Paragraph variant="error">{existingNameErr}</Paragraph>
                    )}
                  </>
                )}
              </div>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData colSpan={4}>
              <div className="flex w-full flex-wrap">
                <label className="w-full mb-1 ml-2">
                  <Input
                    type="radio"
                    name="inventoryRegistration"
                    value={1}
                    onChange={(e) => handleInventoryRegistration(e.target)}
                    className="mr-1"
                  />
                  新規に在庫品を登録
                </label>
                {inventoryRegistration === "1" && (
                  <>
                    <Input
                      type="text"
                      className="flex-1 ml-4"
                      ref={newNameRef}
                      defaultValue={item.general_name}
                    />
                    <Input
                      type="text"
                      id="amount"
                      className="w-17 ml-3 text-center"
                      placeholder="追加数"
                      ref={newAmountRef}
                    />
                    {newNameErr && (
                      <Paragraph variant="error">{newNameErr}</Paragraph>
                    )}
                  </>
                )}
              </div>
            </TableData>
          </TableRow>
        </>
      )}
    </>
  );
});

export default RegistrationReceiptTableRow;
