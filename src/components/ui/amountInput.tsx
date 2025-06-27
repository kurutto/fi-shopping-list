import React, { Ref, useState } from "react";
import { UseFormSetValue, FieldValues, Path, PathValue, useController } from "react-hook-form";
import Input from "./input";
import Button from "./button";
import Box from "./box";
import { toHalfWidthNumber } from "@/lib/toHalfWidthNumberAndValidate";

interface AmountInputType<T extends FieldValues> {
  ref?: Ref<HTMLInputElement>;
  defaultAmount?: number;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  id?: string;
  setValue?: UseFormSetValue<T>;
}

const AmountInput = <T extends FieldValues>({
  ref,
  defaultAmount,
  inputProps,
  id,
  setValue,
}: AmountInputType<T>) => {
  const [amount, setAmount] = useState<string | number>(defaultAmount ? defaultAmount : 0);
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
          const newValue = Number(toHalfWidthNumber(e.target.value));
          if(typeof newValue != "number"){
            setAmount(0);
            return;
          }
          setAmount(Number(newValue));
          if (setValue && id) {
            setValue(id as Path<T>, newValue as PathValue<T, Path<T>>);
          }
  }
  const handleDecrease = () => {
    if(typeof amount === "number"){
      if (0 < amount ) {
        setAmount((prev) => Number(prev) - 1);
        if (setValue && id) {
          setValue(id as Path<T>, (amount - 1) as PathValue<T, Path<T>>);
        }
      }
    }
    
  };
  const handleIncrease = () => {
    if(typeof amount === "number"){
      setAmount((prev) => Number(prev) + 1);
      if (setValue && id) {
        setValue(id as Path<T>, (amount + 1) as PathValue<T, Path<T>>);
      }
    }
  };
  return (
    <Box className="flex gap-2">
      <Button
        type="button"
        color="outline"
        className="w-12.5 text-2xl"
        onClick={handleDecrease}
      >
        &#8722;
      </Button>
      <Input
        type="text"
        className="w-15 text-center"
        ref={ref}
        value={amount}
        onChange={(e) => {
          const halfWidth = toHalfWidthNumber(e.target.value);
          const newValue = Number(halfWidth);
          if(isNaN(newValue)){
            setAmount(0);
            return;
          }
          setAmount(newValue);
          if (setValue && id) {
            setValue(id as Path<T>, newValue as PathValue<T, Path<T>>);
          }
        }}
        {...inputProps}
        id={id}
      />
      <Button
        type="button"
        color="outline"
        className="w-12.5 text-2xl"
        onClick={handleIncrease}
      >
        &#0043;
      </Button>
    </Box>
  );
};

export default AmountInput;
