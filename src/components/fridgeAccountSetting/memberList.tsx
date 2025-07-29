"use client";
import useSWR from "swr";
import Box from "../ui/box";
import Heading from "../ui/heading";
import { Li, List } from "../ui/list";
import { UserFridgeType } from "@/types/types";
import RemoveFromUserListButton from "./removeFromMemberButton";
import { useEffect, useState } from "react";

interface UserListProps {
  fridgeId: string;
  users: UserFridgeType[];
  currentUser: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MemberList = ({ fridgeId, users, currentUser }: UserListProps) => {
  const [usersList, setUsersList] = useState(users)
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}`,
    fetcher,
    {
      revalidateOnMount: false,
    }
  );
  useEffect(() => {
    setUsersList(data?.userFridges ?? users);
  },[data])
  return (
    <Box variant="spaceY" className="mb-8">
      <Heading level={4}>メンバー一覧</Heading>
      <List>
        {usersList.map((user) => (
          <Li
            key={user.userId}
            className="flex md:justify-between items-center"
          >
            ・{user.user.name}
            {user.userId !== currentUser && (
              <RemoveFromUserListButton fridgeId={fridgeId} user={user} />
            )}
          </Li>
        ))}
      </List>
    </Box>
  );
};

export default MemberList;
