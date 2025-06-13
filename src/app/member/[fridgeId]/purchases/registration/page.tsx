"use client";
import Box from "@/components/ui/box";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Paragraph from "@/components/ui/paragraph";
import { useSession } from "next-auth/react";
import { useContext, useRef, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { ModalContext, ModalContextType } from "@/context/modalContext";
import { categories } from "@/constants/categories";

const PurchasesRegistrationPage = () => {
  const { data: session } = useSession();
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [categoriesCheck , setCategoriesCheck ] = useState(categories.map((category,idx) => ({id:idx,checked:true})));

  if (!session || !session.user) {
    return <div>Loading...</div>;
  }
  const handleChange = async () => {
    const image = inputRef.current?.files;
    if (image) {
      const formData = new FormData();
      formData.append("image", image[0]);
      const categoriesChecked = categoriesCheck.filter(categoryCheck => categoryCheck.checked === true).map(item => item.id)
      formData.append("categories", JSON.stringify(categoriesChecked));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fridge/${session?.user.fridgeId}/purchase/read-photo/receipt`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      handleItemOpen(3, undefined, data.items);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleCategoryCheck = (idx:number) => {
    setCategoriesCheck(prev => prev.map((item,prevIdx) => (prevIdx === idx ? {...item,checked:!item.checked} : item)))

  }

  return (
    <>
      <Heading level={1} icon={FaBagShopping}>
        購入品登録
      </Heading>
      <div className="w-full flex md:gap-x-11 max-md:gap-x-2.5">
        <Box variant="rounded" className="flex-1 flex flex-col justify-between">
          <Heading level={2} className="justify-center">
            レシート読取
          </Heading>
          <ul>
            {categories.map((category,idx) => (
              <li key={idx}>
                <Label variant="check">
                  <Input type="checkbox" className="mr-2" value={idx} checked={categoriesCheck[idx].checked} onClick={() => handleCategoryCheck(idx)} />{category}</Label>
                </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <input
              type="file"
              capture="environment"
              accept="image/*"
              onChange={handleChange}
              ref={inputRef}
              className="hidden"
            />
            <Button variant="photo" color="primary" onClick={handleClick} />
          </div>
        </Box>
        <Box variant="rounded" className="flex-1 flex flex-col justify-between">
          <Heading level={2} className="justify-center">
            商品読取
          </Heading>
          <Paragraph>
            商品名が読み取れるように一つずつ撮影してください。
          </Paragraph>
          <div className="flex justify-center">
            <Button variant="photo" color="primary" />
          </div>
        </Box>
      </div>
    </>
  );
};

export default PurchasesRegistrationPage;
