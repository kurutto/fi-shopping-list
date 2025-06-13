import PurchaseFromReceipt from "@/components/purchase/purchaseFromReceipt";
import Box from "@/components/ui/box";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FaBagShopping } from "react-icons/fa6";

const PurchasesRegistrationPage = async() => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Heading level={1} icon={FaBagShopping}>
        購入品登録
      </Heading>
      <div className="w-full flex md:gap-x-11 max-md:gap-x-2.5">
        <Box variant="rounded" className="flex-1 flex flex-col justify-between">
          <Heading level={2} className="justify-center">
            レシート読取
          </Heading>
          <PurchaseFromReceipt session={session} />
        </Box>
        <Box variant="rounded" className="flex-1 flex flex-col justify-between">
          <Heading level={2} className="justify-center">
            商品読取
          </Heading>
          <Paragraph>
            商品名が読み取れるように一つずつ撮影してください。
          </Paragraph>
          <div className="flex justify-center">
            <Button variant="photo" color="primary" />
          </div>
        </Box>
      </div>
    </>
  );
};

export default PurchasesRegistrationPage;
