import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";

const SignupComplete = () => {
  return (
    <Box variant="roundedMaxMd">
      <Heading level={2} className="justify-center">ご登録メールアドレスに確認メールを送信しました</Heading>
      <div className="space-y-4 sm:text-center max-w-lg mx-auto">
      <Paragraph>
        まだ登録は完了していません。
        </Paragraph>
        <Paragraph>
        メールアドレスの確認メールをお送りしましたので、メール内のリンクをクリックしてアカウントを有効化してください。
        </Paragraph>
        <Paragraph>
        メールが届かない場合は、迷惑メールフォルダをご確認いただくか、もう一度確認メールを送信してください。
      </Paragraph>
      </div>
    </Box>
  );
};
export default SignupComplete;
