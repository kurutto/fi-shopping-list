import { getServerSession } from "next-auth";
import PurchaseLists from "@/components/purchase/purchaseLists";
import { getPurchases, getPurchasesUsers } from "@/lib/purchase";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Heading from "@/components/ui/heading";
import { FaFileLines } from "react-icons/fa6";
import Box from "@/components/ui/box";
import { PurchasesUserType } from "@/types/types";

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
  const users: PurchasesUserType[] = getPurchasesUsers(purchases);
  return (
    <>
      <Heading level={1} icon={FaFileLines}>
        購入履歴
      </Heading>
      <Box variant="roundedMaxMd" className="md:max-w-md md:mx-auto">
        <PurchaseLists
          userId={userId}
          fridgeId={fridgeId}
          purchases={purchases}
          users={users}
        />
      </Box>
    </>
  );
};

export default PurchasesPage;
