'use client'
import { categories } from '@/constants/categories'
import React, { useContext, useRef, useState } from 'react'
import Label from '../ui/label'
import Input from '../ui/input'
import { ModalContext, ModalContextType } from '@/context/modalContext'
import { SessionType } from '@/types/types'
import Button from '../ui/button'

interface PurchaseFromReceiptType {
  session:SessionType
}
const PurchaseFromReceipt = ({session}:PurchaseFromReceiptType) => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [categoriesCheck , setCategoriesCheck ] = useState(categories.map((category,idx) => ({id:idx,checked:true})));

  const handleChange = async () => {
    const image = inputRef.current?.files;
    if (image) {
      const formData = new FormData();

      //レシート画像
      formData.append("image", image[0]);
      //選択カテゴリ
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
      <ul className='sm:flex sm:gap-4 sm:justify-center'>
        {categories.map((category,idx) => (
          <li key={idx}>
            <Label variant="check"><Input type="checkbox" className="mr-2" value={idx} checked={categoriesCheck[idx].checked} onChange={() => handleCategoryCheck(idx)} />{category}</Label>
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
    </>
  )
}

export default PurchaseFromReceipt