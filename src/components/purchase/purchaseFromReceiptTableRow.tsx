import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { categories } from "@/constants/categories";
import { getKana } from "@/lib/inventory";
import { useAddPurchase } from "./hooks/useAddPurchase";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Paragraph from "@/components/ui/paragraph";
import { TableRow, TableData } from "@/components/ui/table";
import { ReceiptDataType } from "@/types/types";
import { cn } from "@/lib/utils";

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
  RegisterItem: () => Promise<null | undefined | RegisterItemDataType>;
}
interface PurchaseFromReceiptTableRowType {
  fridgeId: string;
  item: ReceiptDataType;
  date?: string;
}
const PurchaseFromReceiptTableRow = forwardRef<
  RegisterItemType,
  PurchaseFromReceiptTableRowType
>(({ fridgeId, item, date }, ref) => {
  const { inventories } = useAddPurchase(fridgeId);
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category.toString());
  const [retouching, setRetouching] = useState(false);
  const [deleteItem , setDeleteItem] = useState(false)
  const [addInventory, setAddInventory] = useState(false);
  const [inventoryRegistration, setInventoryRegistration] = useState("");
  const existingNameRef = useRef<HTMLSelectElement | null>(null);
  const existingAmountRef = useRef<HTMLInputElement | null>(null);
  const newNameRef = useRef<HTMLInputElement | null>(null);
  const newAmountRef = useRef<HTMLInputElement | null>(null);
  const [nameErr, setNameErr] = useState("");
  const [existingNameErr, setExistingNameErr] = useState("");
  const [existingAmountErr, setExistingAmountErr] = useState("");
  const [newNameErr, setNewNameErr] = useState("");
  const [newAmountErr, setNewAmountErr] = useState("");

  const normalizeAndValidate = (
    input: string,
    elem: HTMLInputElement,
    errFunc: () => void
  ) => {
    const halfWidth = input.replace(/[０-９]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
    );
    elem.value = halfWidth;
    if (!/^\d+$/.test(halfWidth)) {
      errFunc();
    }
  };

  //RegisterItemを親コンポーネントのPurchaseFromReceiptFormから呼び出すためrefを使用
  useImperativeHandle(ref, () => ({
    RegisterItem: async () => {
      if(deleteItem){
        return undefined;
      }else{
        let kana;
        let hasErr = false;

        //バリデーションチェック
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
            const trimInventoryAmount = existingAmountRef.current?.value.trim();
            if (trimInventoryAmount) {
              const setErr = () => {
                setExistingAmountErr("数字以外の文字が含まれています");
                hasErr = true;
              };
              normalizeAndValidate(
                trimInventoryAmount,
                existingAmountRef.current!,
                setErr
              );
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
              normalizeAndValidate(
                trimInventoryAmount,
                newAmountRef.current!,
                setErr
              );
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
      }}
  }));

  return (
    <>
      <TableRow className={cn(deleteItem && "opacity-10")}>
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
        <TableData className="text-center max-md:px-0">
          {!retouching ? 
            <div className="flex">
            <Button
              variant="edit"
              size="small"
              onClick={() => setRetouching((prev) => !prev)}
            /><Button
              variant="delete"
              size="small"
              onClick={() => setDeleteItem((prev) => !prev)}
            /></div>:
          <Button
            size="small"
            color="secondary"
            className="w-11 mx-auto"
            onClick={() => setRetouching((prev) => !prev)}
          >保存</Button>}
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
                    onChange={(e) => setInventoryRegistration(e.target.value)}
                    className="mr-1"
                  />
                  既存の在庫品に登録
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
                      <Paragraph variant="error" className="w-full ml-4">
                        {existingNameErr}
                      </Paragraph>
                    )}
                    {existingAmountErr && (
                      <Paragraph variant="error" className="w-full ml-4">
                        {existingAmountErr}
                      </Paragraph>
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
                    onChange={(e) => setInventoryRegistration(e.target.value)}
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
                    {newAmountErr && (
                      <Paragraph variant="error">{newAmountErr}</Paragraph>
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

export default PurchaseFromReceiptTableRow;
