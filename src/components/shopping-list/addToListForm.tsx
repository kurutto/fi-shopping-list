import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Box from "../ui/box";
import Button from "../ui/button";
import Heading from "../ui/heading";
import Input from "../ui/input";
import Label from "../ui/label";
import Paragraph from "../ui/paragraph";
import { useCreateDataFromModal } from "@/hooks/useCreateDataFromModal";
import { RefObject, useContext, useState } from "react";
import { ModalContext, ModalContextType } from "@/context/modalContext";

const formSchema = z.object({
  name: z
    .string()
    .transform((value) => value.trim())
    .refine((value) => value.length > 0, { message: "必須項目です" }),
  amount: z.string(),
  dueDate: z.string(),
});

type formType = z.infer<typeof formSchema>;
interface AddToListFormProps {
  userId: string;
  fridgeId: string;
}

const AddToListForm = ({ userId, fridgeId }: AddToListFormProps) => {
  const { isAdded, createItem } = useCreateDataFromModal();
  const { handleOpen } = useContext<ModalContextType>(ModalContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (values: formType) => {
    setIsSubmitting(true);
    await createItem(
      `/fridge/${fridgeId}/shopping-list`,
      {
        userId: userId,
        fridgeId: fridgeId,
        name: values.name,
        amount: values.amount,
        dueDate: new Date(values.dueDate),
      },
      reset,
      fridgeId,
      handleOpen
    );
    setIsSubmitting(false);
  };
  return (
    <>
      <Heading level={2} className="justify-center mb-8">
        買物リスト追加
      </Heading>
      {isAdded && <Paragraph className="text-center">{isAdded}</Paragraph>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box variant="spaceY">
          <Box variant="horizontally">
            <Label htmlFor="name" className="w-12">
              品名<span className="text-destructive">*</span>
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
            <Label htmlFor="amount" className="w-12">
              数量
            </Label>
            <Input
              type="text"
              id="amount"
              {...register("amount")}
              className="w-36"
            />
          </Box>
          <Box variant="horizontally">
            <Label htmlFor="name" className="w-12">
              期限日
            </Label>
            <Input type="date" id="date" {...register("dueDate")} />
          </Box>
        </Box>
        <Button
          type="submit"
          color="primary"
          className="block mx-auto w-45 md:mt-8 max-md:mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "登録中" : "登録"}
        </Button>
      </form>
    </>
  );
};

export default AddToListForm;
