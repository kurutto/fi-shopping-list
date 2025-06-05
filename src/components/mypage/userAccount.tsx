"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Label from "../ui/label";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import { UserType } from "@/types/types";
import Input from "../ui/input";
import { useUpdateAccount } from "@/hooks/useUpdateAccount";
import AccountDeleteButton from "./accountDeleteButton";
import Toast from "../toast/toast";

const formSchema = z.object({
  id: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .regex(/^[a-zA-Z0-9]+$/, { message: "半角英数字で入力してください" })
    .min(6, {
      message: "6文字以上で入力してください",
    }),
  name: z
    .string({
      invalid_type_error: "入力値に誤りがります",
    })
    .transform((value) => value.trim())
    .refine((value) => value.length > 0, { message: "必須項目です" }),
});

type formType = z.infer<typeof formSchema>;
interface UserAccountProps {
  user: UserType;
}
const UserAccount = ({ user }: UserAccountProps) => {
  const { updateAccount, isOpen, handleOpen, isEdit, handleEdit } =
    useUpdateAccount();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user.id,
      name: user.name || undefined,
    },
  });
  const handleCancel = () => {
    reset({
      id: user.id,
      name: user.name || undefined,
    });
    handleEdit(false);
  };
  const onSubmit = async (values: formType) => {
    updateAccount(
      `/user/${user.id}`,
      {
        userId: user.id,
        id: values.id,
        name: values.name,
      },
      setError,
      { id: values.id, name: values.name }
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:space-y-7 max-md:space-y-5"
      >
        <div>
          <Label className="font-bold" htmlFor="id">
            ユーザーID
          </Label>
          {isEdit ? (
            <div>
              <Input
                type="text"
                id="id"
                {...register("id")}
                className="w-full"
              />
              {errors.id && (
                <Paragraph variant="error">{errors.id.message}</Paragraph>
              )}
            </div>
          ) : (
            <Paragraph>{user.id}</Paragraph>
          )}
        </div>
        <div>
          <Label className="font-bold" htmlFor="name">
            ユーザー名
          </Label>
          {isEdit ? (
            <div>
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
          ) : (
            <Paragraph>{user.name}</Paragraph>
          )}
        </div>
        {isEdit && (
          <div className="flex gap-4 justify-center">
            <Button type="submit" color="primary" className="w-30">
              送信
            </Button>
            <Button
              type="button"
              color="secondary"
              className="w-30"
              onClick={handleCancel}
            >
              キャンセル
            </Button>
          </div>
        )}
      </form>
      {!isEdit && (
        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            color="outline"
            className="w-30"
            onClick={() => handleEdit(true)}
          >
            編集
          </Button>
          <AccountDeleteButton user={user} />
        </div>
      )}
      <Toast
        isOpen={isOpen}
        handleOpen={handleOpen}
        toastText="アカウント情報が変更されました"
      />
    </>
  );
};

export default UserAccount;
