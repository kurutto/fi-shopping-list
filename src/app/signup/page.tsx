import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { OauthSignin } from "@/components/auth/oAuthSignin";
import { CredentialSignup } from "@/components/auth/credentialSignup";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Heading from "@/components/ui/heading";
import Box from "@/components/ui/box";
import Paragraph from "@/components/ui/paragraph";

const Signup = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect("/");
  }

  return (
    <>
      <Heading level={1}>アカウント作成</Heading>
      <OauthSignin className="md:mb-12 mx-auto" />
      <Paragraph color="gray" className="text-center">
        or
      </Paragraph>
      <Box variant="rounded" className="md:mx-auto md:max-w-lg">
        <CredentialSignup />
      </Box>
    </>
  );
};

export default Signup;
