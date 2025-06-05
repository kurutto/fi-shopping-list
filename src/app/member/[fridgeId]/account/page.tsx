import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";
import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";
import { getFridgeAccount } from "@/lib/fridge";
import { UserFridgeType } from "@/types/types";
import MemberList from "@/components/fridgeAccountSetting/memberList";
import MemberRegistration from "@/components/fridgeAccountSetting/memberRegistration";
import FridgeAccount from "@/components/fridgeAccountSetting/fridgeAccount";

const FridgePage = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }
  const fridgeId = session.user.fridgeId;
  if (!fridgeId) {
    redirect("/fridge-account");
  }
  const fridgeAccount = await getFridgeAccount(fridgeId);
  const users: UserFridgeType[] = fridgeAccount.userFridges;
  return (
    <>
      <Heading level={1}>冷蔵庫アカウント管理</Heading>
      <div className="md:flex md:gap-x-11 max-md:space-y-6">
        <Box variant="rounded" className="flex-1/2">
          <Heading level={2} className="justify-center">
            アカウント情報
          </Heading>
          <FridgeAccount fridgeAccount={fridgeAccount} />
        </Box>
        <Box variant="rounded" className="flex-1/2">
          <Heading level={2} className="justify-center">
            メンバー
          </Heading>
          <MemberList
            fridgeId={fridgeId}
            users={users}
            currentUser={session.user.id}
          />
          <MemberRegistration fridgeId={fridgeId} />
        </Box>
      </div>
    </>
  );
};

export default FridgePage;
