import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Box from "../ui/box";
import Label from "../ui/label";
import Input from "../ui/input";
import Select from "../ui/select";
import Textarea from "../ui/textarea";
import { useState } from "react";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import { postData } from "@/lib/postData";
import { useRouter } from "next/navigation";
import { networkErrorMessage } from "@/constants/messages";

const formSchema = z.object({
  name: z
    .string()
    .transform((value) => value.trim())
    .refine((value) => value.length > 0, { message: "必須項目です" }),
  email: z.string().min(1,{message:"必須項目です"}).email("メールアドレスの形式で入力してください"),
  category: z.string().min(1,{message:"必須項目です"}),
  detail: z.string().transform((value) => value.trim())
    .refine((value) => value.length > 0, { message: "必須項目です" }),
});

type formType = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });
  const categories = [
    "アカウント・ログインに関するご質問",
    "データの保存・同期に関するご質問",
    "アプリの使い方・操作方法に関するご質問",
    "不具合・バグ報告",
    "要望・機能追加のリクエスト",
    "セキュリティ・プライバシーに関するご質問",
    "その他のお問い合わせ",
  ];

  const onSubmit = async (values: formType) => {
    setIsSubmitting(true);
    try {
      await postData("/contact", values);
      reset();
      router.push("/contact/complete");
    } catch {
      alert(networkErrorMessage);
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box variant="spaceY">
        <Box>
          <Label htmlFor="name">
            お名前/ニックネーム
            <span className="text-destructive pl-0.5">*</span>
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
        <Box>
          <Label htmlFor="name">
            メールアドレス<span className="text-destructive pl-0.5">*</span>
          </Label>
          <Paragraph color="gray" className="text-xs mb-2">
            アカウントをお持ちの場合は登録メールアドレスをご入力ください。
          </Paragraph>
          <div className="flex-1">
            <Input
              type="text"
              id="name"
              {...register("email")}
              className="w-full"
            />
            {errors.email && (
              <Paragraph variant="error">{errors.email.message}</Paragraph>
            )}
          </div>
        </Box>
        <Box>
          <Label htmlFor="category">
            お問い合わせカテゴリ
            <span className="text-destructive pl-0.5">*</span>
          </Label>
          <div className="sm:flex-1">
            <Select
              id="category"
              {...register("category")}
              className="w-full"
              defaultValue=""
            >
              <option value="">選択してください</option>
              {categories.map((category, idx) => (
                <option value={category} key={idx}>
                  {category}
                </option>
              ))}
            </Select>
            {errors.category && (
              <Paragraph variant="error">{errors.category.message}</Paragraph>
            )}
          </div>
        </Box>
        <Box>
          <Label htmlFor="remaining">
            お問い合わせ内容<span className="text-destructive pl-0.5">*</span>
          </Label>
          <div className="flex-1">
            <Textarea
              rows={5}
              id="name"
              {...register("detail")}
              className="w-full"
            />
            {errors.detail && (
              <Paragraph variant="error">{errors.detail.message}</Paragraph>
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
          className="block w-45"
          disabled={isSubmitting}
        >
          {isSubmitting ? "送信中" : "送信"}
        </Button>
      </Box>
    </form>
  );
};

export default ContactForm;
