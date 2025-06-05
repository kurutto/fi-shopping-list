import { DataType } from "@/types/types";

export const putData = async (fetchPath: string, data: DataType) => {
  const res =await fetch(`${process.env.NEXT_PUBLIC_API_URL}${fetchPath}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res;
};
