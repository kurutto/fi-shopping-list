import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { getUser } from "@/lib/user";
import AccountList from "@/components/fridgeAccount/accountList";
import CreateAccount from "@/components/fridgeAccount/createAccount";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";

const page = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = await getUser(session!.user.id);
  return (
    <>
      <Heading level={1}>FI買物リスト</Heading>
      {user.userFridges.length > 0 && (
        <>
          <AccountList fridgeAccounts={user.userFridges} />
          <Paragraph color="gray" className="text-center">
            or
          </Paragraph>
        </>
      )}
      <CreateAccount userId={session!.user.id} />
    </>
  );
};

export default page;
