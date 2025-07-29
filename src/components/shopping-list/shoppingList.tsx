"use client";
import useSWR, { mutate } from "swr";
import { FaListUl } from "react-icons/fa6";
import { List, Li } from "../ui/list";
import RemoveFromListButton from "./removeFromListButton";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import { ShoppingListType } from "@/types/types";
import Heading from "../ui/heading";
import AddToListButton from "./addToListButton";

interface ShoppingListProps {
  userId: string;
  fridgeId: string;
  shoppingLists: ShoppingListType[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ShoppingList = ({
  userId,
  fridgeId,
  shoppingLists,
}: ShoppingListProps) => {
  const { data = shoppingLists } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/shopping-list`,
    fetcher,
    {
      fallbackData: shoppingLists,
      revalidateOnMount: false,
    }
  );
  return (
    <>
      {data.length === 0 ? (
        <Paragraph>
          <Button
            variant="add"
            size="small"
            color="primary"
            aria-label="買物リスト追加"
          />
          ボタンを押して買物リストを追加してください。
        </Paragraph>
      ) : (
        <List space="none" className="leading-[1.1] -mt-2.5">
          {data.map((item: ShoppingListType, idx: number) => (
            <Li key={idx} className="relative pr-10 pt-2.5">
              ・{item.name}
              {item.amount && (
                <span className="text-sm pl-1 leading-none">{item.amount}</span>
              )}
              <br />
              <span className="text-xs text-gray">
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                })}
                {item.dueDate && (
                  <span className="text-xs text-gray pl-0.5">
                    (
                    {new Date(item.dueDate).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                    })}
                    まで)
                  </span>
                )}
              </span>
              <span className="text-xs text-gray pl-1">{item.user?.name}</span>
              {item.userId === userId && (
                <RemoveFromListButton
                  fridgeId={fridgeId}
                  listItem={item}
                  mutateFnc={mutate}
                />
              )}
            </Li>
          ))}
        </List>
      )}
    </>
  );
};

export default ShoppingList;
