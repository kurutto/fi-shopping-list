"use client";
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
  const baseStyle = "";
  const {
    sortedInventories,
    handleSortRemainingAscending,
    handleSortRemainingDescending,
    handleSortNameAscending,
    handleSortNameDescending,
  } = useHandleSort(inventories);

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
        <Table className={cn(baseStyle, className)} {...props}>
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
          <TableBody className="max-h-30">
            {sortedInventories.map((inventory, idx) => (
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
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default InventoryTable;
