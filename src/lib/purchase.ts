import { PurchasesUserType, PurchaseType } from "@/types/types";

export const getPurchases = async (
  fridgeId: string
): Promise<PurchaseType[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/purchase`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch purchases");
  }
  return await res.json();
};

export const getPurchasesUsers = (purchases: PurchaseType[]) => {
  const users: PurchasesUserType[] = [];
  purchases.forEach((purchase) => {
    if (!users.some((user) => user.id === purchase.userId)) {
      users.push({ id: purchase.userId, name: purchase.user.name });
    }
  });
  return users;
};