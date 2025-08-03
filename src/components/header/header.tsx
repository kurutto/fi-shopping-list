"use client";
import { useSession } from "next-auth/react";
import Logo from "@/assets/logo";
import Menu from "./menu";
import HamburgerMenu from "./hamburgerMenu";
import Link from "next/link";
import HeaderFridgeAccount from "./headerFridgeAccount";
import { getUser } from "@/lib/user";
import { UserType } from "@/types/types";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserType>();
  const pathname = usePathname();
  useEffect(() => {
    const fetchUserData = async () => {
      const user = session ? await getUser(session.user.id) : undefined;
      setUser(user);
    };
    fetchUserData();
  }, [session]);
  const fridgeId = session?.user.fridgeId;
  const fridgeName = session?.user.fridgeName;
  return (
    <header className="flex justify-between lg:pl-12 lg:py-9 md:py-7 md:pl-7 md:pr-7 md:shadow-[0_4px_10px_rgba(0,0,0,0.05)] max-md:bg-primary max-md:py-2.5 max-md:px-4">
      <h1 className="content-center">
        <Link href="/">
          <Logo
            className="lg:w-9 lg:h-9 md:w-8 md:h-8 md:fill-primary max-md:w-5.5 max-md:h-5.5 max-md:fill-white"
            aria-label="FI買物リスト"
          />
        </Link>
      </h1>
      <div className="flex items-center lg:gap-7 md:gap-6 max-md:gap-3">
        {fridgeId && fridgeName ? (
          <>
            {pathname != "/contact" && <Menu fridgeId={fridgeId} />}
            <HeaderFridgeAccount fridgeId={fridgeId} fridgeName={fridgeName} />
          </>
        ) : null}
        <HamburgerMenu session={session} user={user} />
      </div>
    </header>
  );
};

export default Header;
