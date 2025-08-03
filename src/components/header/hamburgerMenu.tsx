"use client";
import { cn } from "@/lib/utils";
import { FaBars } from "react-icons/fa6";
import HamburgerMenuItem from "./hamburgerMenuItem";
import HamburgerSubMenuItem from "./hamburgerSubMenuItem";
import HamburgerMenuLink from "./hamburgerMenuLink";
import { SessionType, UserType } from "@/types/types";
import { useChangeFridgeAccount } from "@/hooks/useChangeFridgeAccount";
import { useHandleOpen } from "@/hooks/useHandleOpen";
import Overlay from "../ui/overlay";
import CloseButton from "../ui/closeButton";
import Paragraph from "../ui/paragraph";

interface HamburgerMenu {
  session?: SessionType | null;
  user?: UserType;
}

const HamburgerMenu = ({ user, session }: HamburgerMenu) => {
  const { changeFridgeAccount } = useChangeFridgeAccount();
  const { isOpen, handleOpen } = useHandleOpen();
  const handleAccountClick = (id: string, name: string) => {
    changeFridgeAccount(id, name);
    handleOpen();
  };
  const fridgeAccounts = user?.userFridges;
  return (
    <>
      <div
        className="cursor-pointer max-md:text-white"
        onClick={() => handleOpen()}
      >
        <FaBars className="md:text-4xl max-md:text-3xl" />
      </div>
      <Overlay isOpen={isOpen} handleOpen={handleOpen} />
      <div
        className={cn(
          "fixed w-80 h-screen top-0 transition-all bg-white z-50 flex flex-col justify-between",
          isOpen ? "right-0" : "-right-80"
        )}
      >
        <div>
          <CloseButton handleOpen={handleOpen} className="ml-auto mt-4 mr-4" />
          <ul>
            <HamburgerMenuItem
              href={
                session?.user?.fridgeId
                  ? `/member/${session.user.fridgeId}`
                  : session?.user?.fridgeId
                  ? "/member/fridge-account"
                  : "/signin"
              }
              onClick={() => handleOpen()}
            >
              トップページ
            </HamburgerMenuItem>
            {user && (
              <HamburgerMenuItem>
                <HamburgerMenuLink
                  href="/member/fridge-account"
                  onClick={() => handleOpen()}
                >
                  冷蔵庫アカウント作成・切替
                </HamburgerMenuLink>
                {fridgeAccounts && (
                  <ul>
                    {fridgeAccounts.map((fridgeAccount, idx) => (
                      <HamburgerSubMenuItem
                        key={idx}
                        onClick={() =>
                          handleAccountClick(
                            fridgeAccount.fridgeId,
                            fridgeAccount.fridge.name
                          )
                        }
                      >
                        {fridgeAccount.fridge.name}
                      </HamburgerSubMenuItem>
                    ))}
                  </ul>
                )}
              </HamburgerMenuItem>
            )}
            {session?.user?.fridgeId && (
              <HamburgerMenuItem
                href={`/member/${session?.user?.fridgeId}/account`}
                onClick={() => handleOpen()}
              >
                冷蔵庫アカウント管理
              </HamburgerMenuItem>
            )}
            {user ? (
              <>
                <HamburgerMenuItem
                  href="/member/mypage"
                  onClick={() => handleOpen()}
                >
                  マイページ
                </HamburgerMenuItem>
                <HamburgerMenuItem
                  href="/api/auth/signout"
                  onClick={() => handleOpen()}
                >
                  ログアウト
                </HamburgerMenuItem>
              </>
            ) : (
              <>
                <HamburgerMenuItem href="/signin" onClick={() => handleOpen()}>
                  ログイン
                </HamburgerMenuItem>
                <HamburgerMenuItem href="/signup" onClick={() => handleOpen()}>
                  アカウント作成
                </HamburgerMenuItem>
              </>
            )}
            <HamburgerMenuItem href="/contact" onClick={() => handleOpen()}>
              お問い合わせ
            </HamburgerMenuItem>
          </ul>
        </div>
        <Paragraph color="gray" className="text-center text-xs p-2">
          &copy; 2025 FI買物リスト
        </Paragraph>
      </div>
    </>
  );
};

export default HamburgerMenu;
