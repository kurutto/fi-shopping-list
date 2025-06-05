import { DataType } from "@/types/types";

export const postData = async(fetchPath:string,data:DataType) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${fetchPath}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    const errData = await res.json();
    alert(errData.message);
  } 
}