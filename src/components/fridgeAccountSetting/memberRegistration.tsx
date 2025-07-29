"use client";
import { mutate } from "swr";
import { useRef, useState } from "react";
import { UserType } from "@/types/types";
import Paragraph from "../ui/paragraph";
import { getUser } from "@/lib/user";
import Box from "../ui/box";
import Heading from "../ui/heading";
import Label from "../ui/label";
import Input from "../ui/input";
import Button from "../ui/button";
import { postData } from "@/lib/postData";
import { networkErrorMessage } from "@/constants/messages";

interface UserRegistrationProps {
  fridgeId: string;
}

const MemberRegistration = ({ fridgeId }: UserRegistrationProps) => {
  const inputId = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserType>();
  const handleSearch = async () => {
    const user = await getUser(inputId.current!.value);
    setUser(user);
  };
  const handleAdd = async () => {
    try {
      await postData(`/fridge/${fridgeId}/account`, {
        userId: user!.id,
        fridgeId: fridgeId,
      });
      setUser(undefined);
      inputId.current!.value = "";
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}`);
    } catch {
      alert(networkErrorMessage);
    }
  };
  return (
    <div className="space-y-2">
      <Heading level={4}>メンバー登録</Heading>
      <div>
        <Label className="">ユーザー検索</Label>
        <div className="flex">
          <Input type="text" placeholder="ユーザーID" ref={inputId}></Input>
          <Button color="secondary" onClick={handleSearch} className="ml-2">
            検索
          </Button>
        </div>
        <Box>
          {user ? (
            user.userFridges.some(
              (userFridge) => fridgeId === userFridge.fridgeId
            ) ? (
              <Paragraph>{user.name}：登録済</Paragraph>
            ) : (
              <Box variant="horizontally" className="items-center mt-4">
                <Paragraph>{user.name}</Paragraph>
                <Button size="small" color="secondary" onClick={handleAdd}>
                  追加
                </Button>
              </Box>
            )
          ) : null}
        </Box>
      </div>
    </div>
  );
};

export default MemberRegistration;
