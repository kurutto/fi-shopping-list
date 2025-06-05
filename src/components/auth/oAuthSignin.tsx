"use client";
import { FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import Button from "../ui/button";
import { cn } from "@/lib/utils";

interface OauthSigninProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  className: string;
}

const OauthSignin = ({ className,...props }: OauthSigninProps) => {
  const baseStyle = "w-fit";
  return (
    <div className={cn(baseStyle,className)} {...props}>
      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="text-white bg-[#EA4335] w-60"
      >
        <FaGoogle />
        Googleアカウントから
      </Button>
    </div>
  );
};

export { OauthSignin };
