"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Box from "../ui/box";
import Label from "../ui/label";
import Input from "../ui/input";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import { useState } from "react";
import { networkErrorMessage } from "@/constants/messages";

const formSchema = z.object({
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
const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (values: formType) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/reset-password`,
        {
          method: "PUT",
          body: JSON.stringify({
            token: token,
            password: values.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setIsSubmitting(false);
        setError("root", { message: data.message });
      }
      if (res.ok) {
        router.push("/reset-password/complete");
        router.refresh();
      }
    } catch {
      setError("root", { message: networkErrorMessage });
    }
  };
  return (
    <>
      <Paragraph className="text-center">
        新しいパスワードを設定してください。
      </Paragraph>
      <Box variant="roundedMaxMd" className="max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:space-y-10 max-md:space-y-7"
        >
          <Box variant="spaceY" className="mx-auto sm:max-w-md">
            {errors.root && <Paragraph>{errors.root.message}</Paragraph>}
            <Box variant="horizontally">
              <Label htmlFor="password" className="sm:w-25">
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
                  <Paragraph variant="error">
                    {errors.password.message}
                  </Paragraph>
                )}
              </div>
            </Box>
          </Box>
          <Button
            color="primary"
            type="submit"
            className="mt-10 w-48 block mx-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "送信中" : "送信"}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ResetPassword;
