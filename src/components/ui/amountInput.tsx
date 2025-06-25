import React, { Ref, useState } from "react";
import { UseFormSetValue, FieldValues, Path, PathValue } from "react-hook-form";
import Input from "./input";
import Button from "./button";
import Box from "./box";

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
  const [amount, setAmount] = useState(defaultAmount ? defaultAmount : 0);
  const handleDecrease = () => {
    if (0 < amount) {
      setAmount((prev) => prev - 1);
      if (setValue && id) {
        setValue(id as Path<T>, (amount - 1) as PathValue<T, Path<T>>);
      }
    }
  };
  const handleIncrease = () => {
    setAmount((prev) => prev + 1);
    if (setValue && id) {
      setValue(id as Path<T>, (amount + 1) as PathValue<T, Path<T>>);
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
        onChange={(e) => setAmount(Number(e.target.value))}
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
