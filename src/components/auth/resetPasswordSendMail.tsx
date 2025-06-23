"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Box from "../ui/box";
import Label from "../ui/label";
import Input from "../ui/input";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { networkErrorMessage } from "@/constants/messages";

const formSchema = z.object({
  email: z
    .string({
      invalid_type_error: "入力値に誤りがります",
    })
    .min(1, { message: "必須項目です" })
    .email({ message: "正しいメールアドレスを入力してください" }),
});
type formType = z.infer<typeof formSchema>;
const ResetPasswordSendMail = () => {
  const router = useRouter();
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
        `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/reset-password/send-mail`,
        {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
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
        router.push("/reset-password/send-mail/complete");
        router.refresh();
      }
    } catch (error) {
      console.error("送信エラー:", error);
      setError("root", { message: networkErrorMessage });
    }
  };

  return (
    <>
      <Paragraph className="max-w-g md:text-center">
        ユーザーIDとメールアドレスを入力してパスワードリセットメールを送信してください。
      </Paragraph>
      <Box variant="roundedMaxMd" className="max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:space-y-10 max-md:space-y-7"
        >
          <Box variant="spaceY" className="mx-auto sm:max-w-md">
            {errors.root && <Paragraph>{errors.root.message}</Paragraph>}
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
          </Box>
          <Button
            color="primary"
            type="submit"
            className="mt-10 w-48 block mx-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "送信中" : "メールを送信"}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ResetPasswordSendMail;
