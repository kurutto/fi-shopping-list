import { PurchasesUserType, PurchaseType } from "@/types/types";
import React from "react";
import Heading from "../ui/heading";
import PurchaseList from "./purchaseList";

interface PurchaseListsProps {
  userId: string;
  fridgeId: string;
  purchases: PurchaseType[];
  users: PurchasesUserType[];
}
const PurchaseLists = ({
  userId,
  fridgeId,
  purchases,
  users,
}: PurchaseListsProps) => {
  //購入履歴の中から日付を取り出す
  const dates: Date[] = [];
  purchases.forEach((purchase) => {
    if (!dates.some((date) => date === purchase.purchaseDate)) {
      dates.push(purchase.purchaseDate);
    }
  });
  //取り出した日付を若い順に並べる
  const sortedDates = [...dates];
  sortedDates.sort((first, second) => {
    if (first > second) {
      return -1;
    } else if (second > first) {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <>
      {sortedDates.map((date, idx) => (
        <div key={idx}>
          <Heading level={2} className="justify-center md:mb-7 max-md:mb-5">
            {new Date(date).toLocaleDateString()}
          </Heading>
          <PurchaseList
            userId={userId}
            fridgeId={fridgeId}
            date={new Date(date)}
            purchases={purchases}
            users={users}
            headingStyle="text-left"
          />
        </div>
      ))}
    </>
  );
};
export default PurchaseLists;
