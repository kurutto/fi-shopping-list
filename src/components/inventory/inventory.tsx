"use client";
import useSWR from "swr";
import InventoryTable from "@/components/inventory/inventoryTable";
import { InventoryType } from "@/types/types";

interface InventoryProps {
  fridgeId: string;
  inventories: InventoryType[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Inventory = ({ fridgeId, inventories }: InventoryProps) => {
  const { data = inventories } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/inventory`,
    fetcher,
    {
      fallbackData: inventories,
      revalidateOnMount: false,
    }
  );
  return (
    <div>
      <InventoryTable inventories={data} />
    </div>
  );
};

export default Inventory;
