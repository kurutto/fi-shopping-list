import { UserType } from '@/types/types';

export const getUser = async (userId: string): Promise<UserType> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status}`);
  } 
  return await res.json();
};