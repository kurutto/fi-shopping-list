"use client";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Label from "../ui/label";
import Input from "../ui/input";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import Box from "../ui/box";
import Heading from "../ui/heading";
import { useState } from "react";

const formSchema = z.object({
  id: z.string().min(1, { message: "必須項目です" }),
  password: z.string().min(1, { message: "必須項目です" }),
});
type formType = z.infer<typeof formSchema>;

const CredentialSignin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (values: formType) => {
    setIsSubmitting(true);
    await signIn("credentials", {
      id: values.id,
      password: values.password,
      callbackUrl: "/",
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:space-y-10 max-md:space-y-7"
    >
      <Heading level={3} className="text-center">
        IDとパスワードでログイン
      </Heading>
      <Box variant="spaceY" className="mx-auto sm:max-w-xs">
        {errors.root && <p>{errors.root.message}</p>}
        <Box variant="horizontally">
          <Label htmlFor="id" className="w-25">
            ID
          </Label>
          <div className="flex-1">
            <Input type="text" id="id" {...register("id")} className="w-full" />
            {errors.id && (
              <Paragraph variant="error">{errors.id.message}</Paragraph>
            )}
          </div>
        </Box>
        <Box variant="horizontally">
          <Label htmlFor="password" className="w-25">
            パスワード
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
        className="w-48 block mx-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? "ログイン中" : "ログイン"}
      </Button>
    </form>
  );
};

export { CredentialSignin };
