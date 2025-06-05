import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";
import FridgeModal from "@/components/fridge/fridgeModal";
import BottomMenu from "@/components/bottomMenu/bottomMenu";
import { getUser } from "@/lib/user";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/signin");
  }
  const user = await getUser(session.user.id);
  if (!user) {
    redirect("/signout");
  }

  return (
    <>
      {children}
      {session.user.fridgeId && (
        <>
          <FridgeModal
            userId={session.user.id}
            fridgeId={session.user.fridgeId}
          />
          <BottomMenu
            fridgeId={session.user.fridgeId}
            className="md:hidden fixed bottom-0 left-0 w-full m-0 p-0"
          />
        </>
      )}
    </>
  );
}
