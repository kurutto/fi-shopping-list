'use client'
import React, { useContext, useRef } from 'react'
import { ModalContext, ModalContextType } from '@/context/modalContext'
import Button from '../ui/button'
import { Li, List } from '../ui/list'

interface PurchaseFromReceiptType {
  fridgeId:string;
}
const PurchaseFromImage = ({fridgeId}:PurchaseFromReceiptType) => {
  const { handleItemOpen,handleOpen } = useContext<ModalContextType>(ModalContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async () => {
    const image = inputRef.current?.files;
    if (image) {
      const formData = new FormData();
      //レシート画像
      formData.append("image", image[0]);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/purchase/read-photo`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      handleOpen();
      if(data.type === 0){
        handleItemOpen(3, undefined, data.items);
      }else if(data.type === 1){
        handleItemOpen(4, undefined, data.items);
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };
  return (
    <>
      <List variant="ul">
        <Li>・レシート画像</Li>
        <Li>
          ・商品画像（商品名が読み取れるように一つずつ撮影してください）
        </Li>
      </List>
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
    </>
  )
}

export default PurchaseFromImage