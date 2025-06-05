import { InventoryType } from "@/types/types";
import { useEffect, useState } from "react";

export const useHandleSort = (inventories: InventoryType[]) => {
  const [sortedInventories, setSortedInventories] =
    useState<InventoryType[]>(inventories);
  useEffect(() => {
    setSortedInventories(inventories);
  }, [inventories]);

  //残数でソート
  const handleSortRemainingAscending = () => {
    const newList = [...inventories];
    newList.sort((first, second) => {
      if (first.remaining > second.remaining) {
        return -1;
      } else if (second.remaining > first.remaining) {
        return 1;
      } else {
        return 0;
      }
    });
    setSortedInventories(newList);
  };
  const handleSortRemainingDescending = () => {
    const newList = [...inventories];
    newList.sort((first, second) => {
      if (first.remaining < second.remaining) {
        return -1;
      } else if (second.remaining < first.remaining) {
        return 1;
      } else {
        return 0;
      }
    });
    setSortedInventories(newList);
  };

  //カナでソート
  const handleSortNameAscending = () => {
    const newList = [...inventories];
    newList.sort((first, second) => {
      if (
        first.kana.localeCompare(second.kana, "ja", { sensitivity: "base" }) > 0
      ) {
        return -1;
      } else if (
        first.kana.localeCompare(second.kana, "ja", { sensitivity: "base" }) < 0
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    setSortedInventories(newList);
  };
  const handleSortNameDescending = () => {
    const newList = [...inventories];
    newList.sort((first, second) => {
      if (
        first.kana.localeCompare(second.kana, "ja", { sensitivity: "base" }) > 0
      ) {
        return 1;
      } else if (
        first.kana.localeCompare(second.kana, "ja", { sensitivity: "base" }) < 0
      ) {
        return -1;
      } else {
        return 0;
      }
    });
    setSortedInventories(newList);
  };
  return {
    sortedInventories,
    handleSortRemainingAscending,
    handleSortRemainingDescending,
    handleSortNameAscending,
    handleSortNameDescending,
  };
};
