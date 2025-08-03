import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";

const ContactComplete = () => {
  return (
    <Box variant="roundedMaxMd">
      <Heading level={2} className="justify-center">
        お問い合わせを受け付けました
      </Heading>
      <div className="space-y-4 max-w-lg mx-auto">
        <Paragraph>
          お問い合わせ内容を確認の上、担当者より3営業日以内にご連絡させていただきます。
        </Paragraph>
        <Paragraph>
          ※自動送信の確認メールをお送りしております。届いていない場合は、迷惑メールフォルダ等をご確認ください。
        </Paragraph>
        <Paragraph>
          ご不明な点がございましたら、お気軽に以下のメールアドレスまでご連絡ください。
          <br />
          fishoppinglist@gmail.com
        </Paragraph>
      </div>
    </Box>
  );
};
export default ContactComplete;
