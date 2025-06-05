import Link from "next/link";

interface HeaderFridgeAccountProps {
  fridgeId: string;
  fridgeName: string;
}

const HeaderFridgeAccount = ({
  fridgeId,
  fridgeName,
}: HeaderFridgeAccountProps) => {
  return (
    <div>
      <Link
        className="block md:py-1.5 md:px-3 md:rounded-md md:bg-secondary max-lg:text-sm max-md:text-base max-md:text-white"
        href={`/member/${fridgeId}/`}
      >
        {fridgeName}
      </Link>
    </div>
  );
};

export default HeaderFridgeAccount;
