import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/lib/next-auth/options";
import PurchaseLists from "@/components/purchase/purchaseLists";
import Heading from "@/components/ui/heading";
import Box from "@/components/ui/box";
import { FaFileLines } from "react-icons/fa6";
import { getPurchases } from "@/lib/purchase";

const PurchasesPage = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;
  const fridgeId = session.user.fridgeId;
  if (!fridgeId) {
    redirect("/fridge-account");
  }

  const purchases = await getPurchases(fridgeId);
  return (
    <>
      <Heading level={1} icon={FaFileLines}>
        購入履歴
      </Heading>
      <Box variant="roundedMaxMd" className="md:max-w-md md:mx-auto">
        <PurchaseLists userId={userId} fridgeId={fridgeId} purchases={purchases}  />
      </Box>
    </>
  );
};

export default PurchasesPage;
