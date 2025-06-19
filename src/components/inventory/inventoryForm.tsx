"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Box from "../ui/box";
import Button from "../ui/button";
import Heading from "../ui/heading";
import Input from "../ui/input";
import Label from "../ui/label";
import Paragraph from "../ui/paragraph";
import Select from "../ui/select";
import { categories } from "@/constants/categories";
import { InventoryType } from "@/types/types";
import { cn } from "@/lib/utils";
import { getKana } from "@/lib/inventory";
import { useContext, useState } from "react";
import { ModalContext, ModalContextType } from "@/context/modalContext";
import { useDeleteDataFromModal } from "@/hooks/useDeleteDataFromModal";
import { useUpdateDataFromModal } from "@/hooks/useUpdateDataFromModal";
import { useCreateDataFromModal } from "@/hooks/useCreateDataFromModal";
import { createId } from '@paralleldrive/cuid2';

const formSchema = z.object({
  category: z.coerce.number(),
  name: z
    .string()
    .transform((value) => value.trim())
    .refine((value) => value.length > 0, { message: "必須項目です" }),
  remaining: z.coerce.number({ message: "半角整数で入力してください" }),
});

type formType = z.infer<typeof formSchema>;
interface InventoryFormProps {
  fridgeId: string;
  inventory?: InventoryType | null;
}

const InventoryForm = ({ fridgeId, inventory }: InventoryFormProps) => {
  const { handleOpen } = useContext<ModalContextType>(ModalContext);
  const { isAdded, createItem } = useCreateDataFromModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateItem } = useUpdateDataFromModal();
  const { deleteItem } = useDeleteDataFromModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: inventory?.category || 0,
      name: inventory?.name || "",
      remaining: inventory?.remaining || 0,
    },
  });

  const onSubmit = async (values: formType) => {
    setIsSubmitting(true);
    const kana = await getKana(fridgeId, values.name);
    if (inventory) {
      updateItem(
        `/fridge/${fridgeId}/inventory`,
        {
          fridgeId: fridgeId,
          inventoryId: inventory?.id,
          category: Number(values.category),
          name: values.name,
          kana: kana,
          amount: values.remaining,
        },
        reset,
        handleOpen
      );
    } else {
      createItem(
        `/fridge/${fridgeId}/inventory`,
        {
          inventoryId:createId(),
          fridgeId: fridgeId,
          category: Number(values.category),
          name: values.name,
          kana: kana,
          amount: values.remaining,
        },
        reset,
        fridgeId,
        handleOpen
      );
    }
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    deleteItem(`/fridge/${fridgeId}/inventory/${inventory!.id}`, handleOpen);
  };

  return (
    <>
      <Heading level={2} className="justify-center mb-8">
        {inventory ? "在庫管理編集" : "在庫管理追加"}
      </Heading>
      {isAdded && <Paragraph className="text-center">{isAdded}</Paragraph>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box variant="spaceY">
          <Box variant="horizontally">
            <Label htmlFor="category" className="w-19">
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
            <Label htmlFor="name" className="w-19">
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
            <Label htmlFor="remaining" className="w-19">
              残数<span className="text-destructive pl-0.5">*</span>
            </Label>
            <div className="sm:flex-1">
              <Input
                type="text"
                id="remaining"
                {...register("remaining")}
                className="w-36"
              />
              {errors.remaining && (
                <Paragraph variant="error">
                  {errors.remaining.message}
                </Paragraph>
              )}
            </div>
          </Box>
        </Box>
        <Box
          variant="horizontally"
          className=" md:mt-8 max-md:mt-6 justify-center"
        >
          <Button
            type="submit"
            color="primary"
            className={cn("block", inventory ? "w-30" : "w-45")}
            disabled={isSubmitting}
          >
            送信
          </Button>
          {inventory && (
            <Button
              type="button"
              color="secondary"
              className="block w-30"
              onClick={handleDelete}
            >
              削除
            </Button>
          )}
        </Box>
      </form>
    </>
  );
};

export default InventoryForm;
