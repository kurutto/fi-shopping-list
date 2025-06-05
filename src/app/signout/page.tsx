"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Signout = () => {
  useEffect(() => 
  {
    signOut({ callbackUrl: "/signin" });
  },[])
  return <div className="text-center">セッションが無効なためサインアウトします</div>;
};

export default Signout;
