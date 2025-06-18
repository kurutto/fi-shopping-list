"use client";
import Box from "../ui/box";
import Heading from "../ui/heading";
import Paragraph from "../ui/paragraph";
import PurchaseForm from "./purchaseForm";
import PurchaseFromImage from "./purchaseFromImage";

interface PurchaseRegistrationProps {
  userId: string;
  fridgeId: string;
}

const PurchaseRegistration = ({ userId, fridgeId }: PurchaseRegistrationProps) => {
  return (
    <>
      <Heading level={2} className="justify-center mb-8">
        購入品追加
      </Heading>
      <Box variant="rounded" spBgWhite={true} className="flex-1 flex flex-col justify-between">
        <Heading level={3} className="text-center">
          画像読取
        </Heading>
        <PurchaseFromImage fridgeId={fridgeId} />
      </Box>
      <Paragraph color="gray" className="text-center">
        or
      </Paragraph>
      <Heading level={3} className="text-center">
        フォーム入力
      </Heading>
      <PurchaseForm userId={userId} fridgeId={fridgeId} />
    </>
  );
};

export default PurchaseRegistration;
