import Box from "@/components/ui/box";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";
import Link from "next/link";

const SignupComplate = () => {
  return (
    <Box variant="roundedMaxMd" className="max-w-lg mx-auto">
      <Heading level={2} className="justify-center">
        パスワードのリセットが完了しました
      </Heading>
        <Paragraph>
          パスワードのリセットが完了しました。ログインページからログインしてください。
        </Paragraph>
        <div className="flex justify-center">
        <Button color="primary"><Link href="/signin">ログインページ</Link></Button>
        </div>
    </Box>
  );
};
export default SignupComplate;
