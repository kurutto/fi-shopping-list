import { useState } from "react";

export const useHandleOpen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (open?:boolean | null | undefined) => {
    if (typeof open === "boolean") {
      setIsOpen(open);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return { isOpen, handleOpen };
};
