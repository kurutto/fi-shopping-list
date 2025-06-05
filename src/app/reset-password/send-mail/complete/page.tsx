import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";

const SignupComplate = () => {
  return (
    <Box variant="roundedMaxMd">
      <Heading level={2} className="justify-center">
        ご登録メールアドレスにパスワードリセットメールを送信しました
      </Heading>
      <div className="space-y-4 sm:text-center max-w-lg mx-auto">
        <Paragraph>
          パスワードリセットメールをお送りしましたので、メール内のリンクをクリックしてパスワードを再設定してください。
        </Paragraph>
        <Paragraph>
          メールが届かない場合は、迷惑メールフォルダをご確認いただくか、もう一度パスワードリセットメールを送信してください。
        </Paragraph>
      </div>
    </Box>
  );
};
export default SignupComplate;
