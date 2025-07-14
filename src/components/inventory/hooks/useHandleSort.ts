import { InventoryType } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

export const useHandleSort = (inventories: InventoryType[]) => {
  const [sortedInventories, setSortedInventories] =
    useState<InventoryType[]>(inventories);
  const [sortConfig, setSortConfig] = useState<{
    type: "remaining" | "kana";
    order: "asc" | "desc";
  }>();
  useEffect(() => {
    setSortedInventories(inventories);
  }, [inventories]);

  useEffect(() => {
    if (!sortConfig) return;
    const newList = [...inventories];
    let comparison = 0;
    newList.sort((first, second) => {
      if (sortConfig.type === "remaining") {
        comparison = first.remaining - second.remaining;
      } else if (sortConfig.type === "kana") {
        comparison = first.kana.localeCompare(second.kana, "ja", {
          sensitivity: "base",
        });
      }
      return sortConfig.order === "desc" ? comparison : -comparison;
    });
    setSortedInventories(newList);
  }, [inventories, sortConfig]);
  //残数でソート
  const handleSortRemainingAscending = useCallback(() => {
    setSortConfig({ type: "remaining", order: "asc" });
  }, []);
  const handleSortRemainingDescending = useCallback(() => {
    setSortConfig({ type: "remaining", order: "desc" });
  }, []);

  //カナでソート
  const handleSortNameAscending = useCallback(() => {
    setSortConfig({ type: "kana", order: "asc" });
  }, []);
  const handleSortNameDescending = useCallback(() => {
    setSortConfig({ type: "kana", order: "desc" });
  }, []);

  return {
    sortedInventories,
    handleSortRemainingAscending,
    handleSortRemainingDescending,
    handleSortNameAscending,
    handleSortNameDescending,
  };
};
