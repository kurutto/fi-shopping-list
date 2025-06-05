import { UserType } from '@/types/types';

export const getUser = async (userId: string): Promise<UserType> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`);
  if (!res.ok) {
    const data = await res.json();
    alert(data.message);
  } 
  return await res.json();
};