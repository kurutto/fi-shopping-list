import React from "react";
import Box from "../ui/box";
import Heading from "../ui/heading";
import { Li, List } from "../ui/list";
import { UserFridgeType } from "@/types/types";
import RemoveFromUserListButton from "./removeFromMemberButton";

interface UserListProps {
  fridgeId: string;
  users: UserFridgeType[];
  currentUser: string;
}

const MemberList = ({ fridgeId, users, currentUser }: UserListProps) => {
  return (
    <Box variant="spaceY" className="mb-8">
      <Heading level={4}>メンバー一覧</Heading>
      <List>
        {users.map((user) => (
          <Li
            key={user.userId}
            className="flex md:justify-between items-center"
          >
            ・{user.user.name}
            {user.userId !== currentUser && <RemoveFromUserListButton fridgeId={fridgeId} user={user} />}
          </Li>
        ))}
      </List>
    </Box>
  );
};

export default MemberList;
