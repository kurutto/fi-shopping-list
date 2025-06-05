"use client";
import { UserFridgeType } from "@/types/types";
import { useChangeFridgeAccount } from "@/hooks/useChangeFridgeAccount";
import Button from "../ui/button";
import { cn } from "@/lib/utils";

interface AccountListProps
  extends Omit<React.ComponentPropsWithoutRef<"ul">, "className"> {
  fridgeAccounts: UserFridgeType[];
  className?: string;
}

const AccountList = ({
  fridgeAccounts,
  className,
  ...props
}: AccountListProps) => {
  const { changeFridgeAccount } = useChangeFridgeAccount();
  if (!fridgeAccounts) {
    return null;
  }
  const baseStyle = "space-y-4 pt-4";

  return (
    <ul className={cn(baseStyle, className)} {...props}>
      {fridgeAccounts.map((fridgeAccount, idx) => (
        <li key={idx}>
          <Button
            color="outline"
            className="min-w-52 mx-auto"
            onClick={() =>
              changeFridgeAccount(
                fridgeAccount.fridgeId,
                fridgeAccount.fridge.name
              )
            }
          >
            {fridgeAccount.fridge.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default AccountList;
