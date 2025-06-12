"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import Box from "../ui/box";
import Button from "../ui/button";
import Heading from "../ui/heading";
import Input from "../ui/input";
import Label from "../ui/label";
import Paragraph from "../ui/paragraph";
import Select from "../ui/select";
import { categories } from "@/constants/categories";
import { useAddPurchase } from "./hooks/useAddPurchase";
import { InventoryType } from "@/types/types";

export const formSchema = (
  inventoryCheck: boolean,
  inventories: InventoryType[]
) =>
  z.object({
    name: z
      .string()
      .transform((value) => value.trim())
      .refine((value) => value.length > 0, { message: "必須項目です" }),
    category: z.string().min(1, {
      message: "必須項目です",
    }),
    date: z.string(),
    inventoryId:
      inventoryCheck && inventories.length > 0
        ? z.string().min(1, {
            message: "必須項目です",
          })
        : z.string(),
    inventoryName:z.union([
        z.literal(""),
        z.string()
    ]),
    amount: z.coerce.number({ message: "半角整数で入力してください" }),
  });

export type formType = z.infer<ReturnType<typeof formSchema>>;

interface PurchaseFormProps {
  userId: string;
  fridgeId: string;
}

const PurchaseForm = ({ userId, fridgeId }: PurchaseFormProps) => {
  const { isAdded, inventories, addPurchase } = useAddPurchase(fridgeId);
  const [inventoryCheck, setInventoryCheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema(inventoryCheck, inventories)),
    defaultValues: {
      category: "0",
      date: new Date().toISOString().split("T")[0],
      amount: 0,
    },
  });
  const onSubmit = async (values: formType) => {
    setIsSubmitting(true);
    addPurchase(inventoryCheck, values, reset, userId);
    setIsSubmitting(false);
  };
  return (
    <>
      <Heading level={2} className="justify-center mb-8">
        購入品追加
      </Heading>
      {isAdded && <Paragraph className="text-center">{isAdded}</Paragraph>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box variant="spaceY">
          <Box variant="horizontally">
            <Label htmlFor="name" className="w-20">
              品名<span className="text-destructive pl-0.5">*</span>
            </Label>
            <div className="flex-1">
              <Input
                type="text"
                id="name"
                {...register("name")}
                className="w-full"
              />
              {errors.name && (
                <Paragraph variant="error">{errors.name.message}</Paragraph>
              )}
            </div>
          </Box>
          <Box variant="horizontally">
            <Label htmlFor="category" className="w-20">
              カテゴリ<span className="text-destructive pl-0.5">*</span>
            </Label>
            <div className="sm:flex-1">
              <Select
                id="category"
                {...register("category")}
                className="flex-1"
              >
                {categories.map((category, idx) => (
                  <option value={idx} key={idx}>
                    {category}
                  </option>
                ))}
              </Select>
              {errors.category && (
                <Paragraph variant="error">{errors.category.message}</Paragraph>
              )}
            </div>
          </Box>
          <Box variant="horizontally">
            <Label htmlFor="name" className="w-20">
              購入日
            </Label>
            <Input type="date" id="date" {...register("date")} />
          </Box>
          <Box variant="horizontally" className="items-center">
            <Label htmlFor="inventoryCheck">在庫管理に追加</Label>
            <Input
              type="checkbox"
              id="inventoryCheck"
              checked={inventoryCheck}
              onChange={() => setInventoryCheck((prev) => !prev)}
            />
          </Box>

          <Paragraph
            className={
              inventoryCheck && inventories.length === 0 ? "" : "hidden"
            }
          >
            在庫管理品がありません。先に在庫管理登録を行なってください。
          </Paragraph>
          <Box
            variant="horizontallyForm"
            className={inventories.length > 0 && inventoryCheck ? "" : "!hidden"}
          >
            <Label htmlFor="inventoryId" className="sm:w-20">
              在庫管理名
            </Label>
            <div>
              <Select
                id="inventoryId"
                {...register("inventoryId")}
                className="flex-1"
              >
                <option value="">既存の在庫管理品から選択</option>
                {inventories?.map((inventory, idx) => (
                  <option value={inventory.id} key={idx}>
                    {inventory.name}({categories[inventory.category]})
                  </option>
                ))}
              </Select>
              {errors.inventoryId && (
                <Paragraph variant="error">{errors.inventoryId.message}</Paragraph>
              )}
            </div>
          </Box>
          <Box
            variant="horizontallyForm"
            className={inventories.length > 0 && inventoryCheck ? "" : "!hidden"}
          >
            <Label htmlFor="amount" className="w-20">
              追加数量<span className="text-destructive pl-0.5">*</span>
            </Label>
            <div className="flex-1">
              <Input
                type="text"
                id="amount"
                {...register("amount")}
                className="w-36"
              />
              {errors.amount && (
                <Paragraph variant="error">{errors.amount.message}</Paragraph>
              )}
            </div>
          </Box>
        </Box>
        <Box
          variant="horizontally"
          className="md:mt-8 max-md:mt-6 justify-center"
        >
          <Button
            type="submit"
            color="primary"
            className="w-45"
            disabled={isSubmitting}
          >
            送信
          </Button>
        </Box>
      </form>
    </>
  );
};

export default PurchaseForm;
