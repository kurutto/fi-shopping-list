import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { getUser } from "@/lib/user";
import Heading from "@/components/ui/heading";
import { redirect } from "next/navigation";
import UserAccount from "@/components/mypage/userAccount";
import Box from "@/components/ui/box";
import FridgeList from "@/components/mypage/fridgeList";

const MyPage = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    return redirect("/signin");
  }
  const user = await getUser(session.user.id);
  return (
    <>
      <Heading level={1}>マイページ</Heading>
      <div className="md:flex md:gap-x-11 max-md:space-y-6">
        <Box variant="rounded" className="flex-1/2">
          <Heading level={2} className="justify-center">
            ユーザー情報
          </Heading>
          <UserAccount user={user} />
        </Box>
        {user!.userFridges ? (
          <Box variant="rounded" className="flex-1/2">
            <Heading level={2} className="justify-center">
              冷蔵庫アカウント
            </Heading>
            <FridgeList fridgeAccounts={user.userFridges} />
          </Box>
        ) : null}
      </div>
    </>
  );
};

export default MyPage;
