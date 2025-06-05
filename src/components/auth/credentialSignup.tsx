"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Heading from "../ui/heading";
import Box from "../ui/box";
import Label from "../ui/label";
import Input from "../ui/input";
import Button from "../ui/button";
import Paragraph from "../ui/paragraph";
import { useRouter } from "next/navigation";
import { networkErrorMessage } from "@/constants/messages";

const formSchema = z.object({
  id: z
    .string({
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
    .refine((value) => value.length > 0, {
      message: "必須項目です",
    }),
  email: z
    .string({
      invalid_type_error: "入力値に誤りがります",
    })
    .min(1, { message: "必須項目です" })
    .email({ message: "正しいメールアドレスを入力してください" }),
  password: z
    .string({
      invalid_type_error: "入力値に誤りがります",
    })
    .regex(/^[a-zA-Z0-9]+$/, { message: "半角英数字で入力してください" })
    .min(8, {
      message: "8文字以上で入力してください",
    }),
});
type formType = z.infer<typeof formSchema>;

const CredentialSignup = () => {
  const router = useRouter();
  const [sendMessage, setSendMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: formType) => {
    setSendMessage(`データ送信中・・・`);
    setResponseMessage("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: values.id,
            name: values.name,
            email: values.email,
            password: values.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        if (data.errorId === "INVALID_ID") {
          setSendMessage("");
          setError("id", { message: data.message });
        } else if (data.errorId === "INVALID_EMAIL") {
          setSendMessage("");
          setError("email", { message: data.message });
        } else {
          setSendMessage("");
          setError("root", { message: data.message });
        }
      }
      if (res.ok) {
        router.push("/signup/complete");
        router.refresh();
      }
    } catch {
      setError("root", { message: networkErrorMessage });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:space-y-10 max-md:space-y-7"
    >
      <Heading level={3} className="text-center">
        IDとパスワードで作成
      </Heading>
      <Box variant="spaceY" className="mx-auto sm:max-w-md">
        {errors.root && <p>{errors.root.message}</p>}
        <Box variant="horizontallyForm">
          <Label htmlFor="id" className="sm:w-35">
            ID<span className="text-destructive">*</span>
          </Label>
          <div className="flex-1">
            <Input type="text" id="id" {...register("id")} className="w-full" />
            {errors.id && (
              <Paragraph variant="error">{errors.id.message}</Paragraph>
            )}
          </div>
        </Box>
        <Box variant="horizontallyForm">
          <Label htmlFor="name" className="sm:w-35">
            ユーザー名<span className="text-destructive">*</span>
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
        <Box variant="horizontallyForm">
          <Label htmlFor="email" className="sm:w-35">
            メールアドレス<span className="text-destructive">*</span>
          </Label>
          <div className="flex-1">
            <Input
              type="email"
              id="email"
              {...register("email")}
              className="w-full"
            />
            {errors.email && (
              <Paragraph variant="error">{errors.email.message}</Paragraph>
            )}
          </div>
        </Box>
        <Box variant="horizontallyForm">
          <Label htmlFor="password" className="sm:w-35">
            パスワード<span className="text-destructive">*</span>
          </Label>
          <div className="flex-1">
            <Input
              type="password"
              id="password"
              {...register("password")}
              className="w-full"
            />
            {errors.password && (
              <Paragraph variant="error">{errors.password.message}</Paragraph>
            )}
          </div>
        </Box>
      </Box>
      <Button
        color="secondary"
        type="submit"
        className="mt-10 w-48 block mx-auto"
      >
        新規作成
      </Button>
      {sendMessage && (
        <Paragraph className="text-center">{sendMessage}</Paragraph>
      )}
      {responseMessage && (
        <Paragraph className="text-center">{responseMessage}</Paragraph>
      )}
    </form>
  );
};

export { CredentialSignup };
