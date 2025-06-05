import { cn } from "@/lib/utils";

interface TableProps
  extends Omit<React.ComponentPropsWithoutRef<"table">, "className"> {
  className?: string;
}
const Table = ({ className, ...props }: TableProps) => {
  const baseStyle = "w-full";
  return <table className={cn(baseStyle, className)} {...props} />;
};

interface TableHeadProps
  extends Omit<React.ComponentPropsWithoutRef<"thead">, "className"> {
  className?: string;
}
const TableHead = ({ className, ...props }: TableHeadProps) => {
  const baseStyle =
    "md:bg-secondary [&_tr]:max-md:border-b-5 [&_tr]:max-md:border-b-slight-gray max-md:text-gray max-md:bg-white max-md:sticky top-0";
  return <thead className={cn(baseStyle, className)} {...props} />;
};

interface TableBodyProps
  extends Omit<React.ComponentPropsWithoutRef<"thead">, "className"> {
  className?: string;
}
const TableBody = ({ className, ...props }: TableBodyProps) => {
  const baseStyle =
    "max-md:bg-white [&_tr]:md:border-b-2 [&_tr]:md:border-dashed [&_tr]:md:border-secondary";
  return <tbody className={cn(baseStyle, className)} {...props} />;
};

interface TableRowProps
  extends Omit<React.ComponentPropsWithoutRef<"tr">, "className"> {
  className?: string;
}
const TableRow = ({ className, ...props }: TableRowProps) => {
  const baseStyle = "";
  return <tr className={cn(baseStyle, className)} {...props} />;
};

interface TableHeaderProps
  extends Omit<React.ComponentPropsWithoutRef<"th">, "className"> {
  className?: string;
}
const TableHeader = ({ className, ...props }: TableHeaderProps) => {
  const baseStyle =
    "font-bold md:py-3.5 md:px-2.5 max-md:p-1.5 max-md:first:pl-3 max-md:last:pl-3";
  return <th className={cn(baseStyle, className)} {...props} />;
};

interface TableDataProps
  extends Omit<React.ComponentPropsWithoutRef<"td">, "className"> {
  className?: string;
}
const TableData = ({ className, ...props }: TableDataProps) => {
  const baseStyle = "md:py-3.5 md:px-2.5 max-md:py-1.5 max-md:px-2";
  return <td className={cn(baseStyle, className)} {...props} />;
};

export { Table, TableHead, TableBody, TableRow, TableHeader, TableData };
