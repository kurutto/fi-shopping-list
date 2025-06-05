import { FridgeType } from "@/types/types";

export const getFridgeAccount = async (
  fridgeId: string
): Promise<FridgeType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch fridge accounts");
  }
  return await res.json();
};
