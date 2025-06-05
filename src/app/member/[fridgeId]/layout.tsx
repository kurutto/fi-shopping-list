import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";

export default async function FridgeLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ fridgeId: string }>;
  children: React.ReactNode;
}>) {
  const { fridgeId } = await params;
  const session = await getServerSession(nextAuthOptions);
  if (fridgeId !== session?.user.fridgeId) {
    redirect("/member/fridge-account");
  }

  return <>{children}</>;
}
