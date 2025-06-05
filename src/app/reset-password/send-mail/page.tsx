import React from "react";
import Heading from "@/components/ui/heading";
import ResetPasswordSendMail from "@/components/auth/resetPasswordSendMail";

const SendMail = async () => {
  return (
    <>
      <Heading level={1}>パスワードのリセット</Heading>
      <ResetPasswordSendMail />
    </>
  );
};

export default SendMail;
