export const deleteData = async (fetchPath: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${fetchPath}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }
};
