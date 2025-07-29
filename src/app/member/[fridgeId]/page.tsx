import { SWRConfig } from 'swr';
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";
import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";
import { FaListUl, FaCubesStacked, FaBagShopping } from "react-icons/fa6";
import AddToListButton from "@/components/shopping-list/addToListButton";
import ShoppingList from "@/components/shopping-list/shoppingList";
import AddInventoryButton from "@/components/inventory/addInventoryButton";
import AddPurchaseButton from "@/components/purchase/addPurchaseButton";
import { getPurchases } from "@/lib/purchase";
import PurchaseList from "@/components/purchase/purchaseList";
import Inventory from "@/components/inventory/inventory";
import { getShoppingList } from "@/lib/shoppingList";
import { getInventories } from "@/lib/inventory";

const FridgePage = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;
  const fridgeId = session.user.fridgeId;
  if (!fridgeId) {
    redirect("/fridge-account");
  }
  const now = new Date();

  const shoppingLists = await getShoppingList(fridgeId);
  const purchases = await getPurchases(fridgeId);
  const inventories = await getInventories(fridgeId);

  return (
    <SWRConfig>
      <div className="w-full md:flex md:flex-wrap md:gap-x-11 md:gap-y-12 max-md:space-y-6">
        <Box variant="rounded" className="md:order-1 md:flex-1">
          <div className="flex justify-between">
            <Heading level={2} icon={FaListUl}>
              買物リスト
            </Heading>
            <AddToListButton />
          </div>
          <ShoppingList
            userId={userId}
            fridgeId={fridgeId}
            shoppingLists={shoppingLists}
          />
        </Box>
        <Box variant="spaceY" className="md:order-3 md:w-full">
          <Heading outline={true} level={2} icon={FaCubesStacked}>
            <div className="flex justify-between items-center w-full">
              在庫管理
              <AddInventoryButton />
            </div>
          </Heading>
          <div>
            <Inventory fridgeId={fridgeId} inventories={inventories} />
          </div>
        </Box>
        <Box variant="rounded" className="md:order-2 md:flex-1">
          <div className="flex justify-between">
            <Heading level={2} icon={FaBagShopping}>
              今日の購入品
            </Heading>
            <AddPurchaseButton />
          </div>
          <PurchaseList
            userId={userId}
            fridgeId={fridgeId}
            date={now}
            headingStyle="max-md:text-center"
            purchases={purchases}
          />
        </Box>
      </div>
    </SWRConfig>
  );
};

export default FridgePage;
