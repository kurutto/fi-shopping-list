import React, { Ref, useState } from "react";
import { UseFormSetValue, FieldValues, Path, PathValue, ControllerRenderProps, UseFormGetValues } from "react-hook-form";
import Input from "./input";
import Button from "./button";
import Box from "./box";
import { toHalfWidthNumber } from "@/lib/toHalfWidthNumberAndValidate";

interface AmountInputType<T extends FieldValues> {
  rhf?:boolean;
  ref?: Ref<HTMLInputElement>;
  defaultAmount?: number;
  id?: string;
  getValues?: UseFormGetValues<T>;
  setValue?: UseFormSetValue<T>;
  field?: ControllerRenderProps<T, Path<T>>;
}

const AmountInput = <T extends FieldValues>({
  rhf=false,
  ref,
  defaultAmount,
  id,
  getValues,
  setValue,
  field,
}: AmountInputType<T>) => {
  const [amount, setAmount] = useState<number>(defaultAmount ? defaultAmount : 0);
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const halfWidth = toHalfWidthNumber(e.target.value);
    const newValue = Number(halfWidth);
    if (isNaN(newValue)) {
      if(rhf){
        field!.onChange(0);
      }else{
        setAmount(0);
      }
      return;
    }
    if(rhf){
      field!.onChange(newValue);
    }else{
      setAmount(newValue);
    }
  }
  const handleDecrease = () => {
    if(rhf && getValues && setValue){
      const current = getValues(id as Path<T>);
      if(0 < current){
        setValue(id as Path<T>, current - 1 as PathValue<T, Path<T>>);
      }
    }else{
      if (0 < amount ) {
        setAmount((prev) => Number(prev) - 1);
      }
    }
  };
  const handleIncrease = () => {
    if(rhf && getValues && setValue){
      const current = getValues(id as Path<T>);
        setValue(id as Path<T>, current + 1 as PathValue<T, Path<T>>);
    }else{
        setAmount((prev) => Number(prev) + 1);
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
      {rhf ? (
        <Input
          type="text"
          className="w-15 text-center"
          {...field}
          onChange={(e) => handleInputChange(e)}
          id={id}
        />
      ):(
        <Input
          type="text"
          className="w-15 text-center"
          ref={ref}
          value={amount}
          onChange={(e) => handleInputChange(e)}
          id={id}
        />
      )}
      
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
