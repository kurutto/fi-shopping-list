import PurchaseList from "./purchaseList";
import Heading from "../ui/heading";
import { PurchaseType } from "@/types/types";

interface PurchaseListsProps {
  userId: string;
  fridgeId: string;
  purchases: PurchaseType[];
}
const PurchaseLists = async ({
  userId,
  fridgeId,
  purchases,
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
            headingStyle="text-left"
            purchases={purchases}
          />
        </div>
      ))}
    </>
  );
};
export default PurchaseLists;
