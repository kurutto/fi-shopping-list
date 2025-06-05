import React from "react";
import { OauthSignin } from "@/components/auth/oAuthSignin";
import { CredentialSignin } from "@/components/auth/credentialSignin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Link from "next/link";
import Heading from "@/components/ui/heading";
import Box from "@/components/ui/box";
import Button from "@/components/ui/button";
import Paragraph from "@/components/ui/paragraph";

const SignIn = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect("/");
  }
  return (
    <>
      <Heading level={1}>ログイン</Heading>
      <OauthSignin className="md:mb-12 mx-auto" />
      <Paragraph color="gray" className="text-center">
        or
      </Paragraph>
      <Box variant="rounded" className="md:mx-auto md:max-w-md">
        <CredentialSignin />
        <Box variant="spaceY">
          <Button variant="text" className="mx-auto block">
            <Link href="/reset-password/send-mail">
              パスワードを忘れた方はこちら
            </Link>
          </Button>
          <Button variant="text" className="mx-auto block">
            <Link href="/signup">アカウント作成はこちら</Link>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
