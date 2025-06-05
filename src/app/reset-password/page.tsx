import React from "react";
import Heading from "@/components/ui/heading";
import ResetPassword from "@/components/auth/resetPassword";

const ResetPasswordPage = async () => {
  return (
    <>
      <Heading level={1}>パスワードのリセット</Heading>
      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;
