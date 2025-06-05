import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useChangeFridgeAccount = () => {
  const { update } = useSession();
  const router = useRouter();
  const changeFridgeAccount = async (fridgeId: string, fridgeName: string) => {
    await update({ fridgeId: fridgeId, fridgeName: fridgeName });
    router.push(`/member/${fridgeId}`);
    router.refresh();
  };
  return { changeFridgeAccount };
};
