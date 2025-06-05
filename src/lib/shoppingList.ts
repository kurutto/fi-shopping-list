import { ShoppingListType } from "@/types/types";

export const getShoppingList = async ( fridgeId:string ): Promise<ShoppingListType[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/shopping-list`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch shopping list");
  }
  return await res.json();
}