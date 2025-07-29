"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "@/hooks/useSwiper";
import { InventoryType } from "@/types/types";
import { categories } from "@/constants/categories";
import { cn } from "@/lib/utils";
import { useHandleSort } from "./hooks/useHandleSort";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import EditInventoryButton from "./editInventoryButton";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useRef, useState } from "react";

interface InventoryTableProps
  extends Omit<React.ComponentPropsWithoutRef<"table">, "className"> {
  inventories: InventoryType[];
  className?: string;
}
const InventoryTable = ({
  inventories,
  className,
  ...props
}: InventoryTableProps) => {

  const tableRef = useRef<HTMLTableElement>(null);
  const [current, setCurrent] = useState(0);
  const [tableHeight, setTableHeight] = useState(0);
  const baseStyle = "";
  const {
    sortedInventories,
    handleSortRemainingAscending,
    handleSortRemainingDescending,
    handleSortNameAscending,
    handleSortNameDescending,
  } = useHandleSort(inventories);

  const pages = Math.floor(
      inventories.length % 5 === 0
        ? inventories.length / 5
        : inventories.length / 5 + 1
    );

  useEffect(() => {
    if(tableRef.current){
    setTableHeight(tableRef.current.offsetHeight);
    }
  },[]);

  const handleSwipeLeft = () => {
    if (pages != 1) {
      setCurrent((prev) => (prev === pages - 1 ? 0 : prev + 1));
    }
  };
  const handleSwipeRight = () => {
    if (pages != 1) {
      setCurrent((prev) => (prev === 0 ? pages - 1 : prev - 1));
    }
  };

  const { handleTouchEnd } = useSwiper(handleSwipeLeft, handleSwipeRight);

  return (
    <>
      {inventories.length === 0 ? (
        <Paragraph className="px-4 py-2">
          <Button
            variant="add"
            size="small"
            color="primary"
            aria-label="在庫管理追加"
          />
          ボタンを押して在庫管理品を追加してください。
        </Paragraph>
      ) : (
        <>
          <Swiper className="" onTouchEnd={handleTouchEnd}>
            <SwiperSlide style={{minHeight:tableHeight}}>
              <Table className={cn(baseStyle, className)} {...props} ref={tableRef}>
                <TableHead>
                  <TableRow>
                    <TableHeader className="text-left">
                      品名
                      <br />
                      <Button
                        variant="angle"
                        angle="up"
                        onClick={handleSortNameAscending}
                        aria-label="降順にソート"
                      />
                      <Button
                        variant="angle"
                        angle="down"
                        onClick={handleSortNameDescending}
                        className="ml-2"
                        aria-label="昇順にソート"
                      />
                    </TableHeader>
                    <TableHeader className="sm:w-20 max-sm:w-15">
                      残数
                      <br />
                      <Button
                        variant="angle"
                        angle="up"
                        onClick={handleSortRemainingAscending}
                        aria-label="降順にソート"
                      />
                      <Button
                        variant="angle"
                        angle="down"
                        onClick={handleSortRemainingDescending}
                        className="ml-2"
                        aria-label="昇順にソート"
                      />
                    </TableHeader>
                    <TableHeader className="w-10"></TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedInventories.map(
                    (inventory, idx) =>
                      current * 5 <= idx &&
                      idx < current * 5 + 5 && (
                        <TableRow key={idx}>
                          <TableData>
                            {inventory.name}
                            <span className="text-xs text-gray pl-0.5">
                              ({categories[inventory.category]})
                            </span>
                          </TableData>
                          <TableData className="text-center">
                            {inventory.remaining}
                          </TableData>
                          <TableData className="text-center">
                            <EditInventoryButton inventory={inventory} />
                          </TableData>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </SwiperSlide>
          </Swiper>
          <div className="flex justify-center gap-2 md:mt-4 max-md:mt-2">
            {
              [...Array(pages)].map((_,idx:number) => (
                <span key={idx} className={cn("bg-secondary rounded-full md:p-2 max-md:p-1.5",idx===current && "bg-light-gray")}></span>
                )
              )
            }
          </div>
        </>
      )}
    </>
  )}

export default InventoryTable;
