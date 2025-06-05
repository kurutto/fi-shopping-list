import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants";
import {
  FaCirclePlus,
  FaXmark,
  FaCamera,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa6";
import React from "react";

interface ButtonProps
  extends Omit<React.ComponentPropsWithRef<"button">, "className"> {
  variant?: "base" | "add" | "delete" | "photo" | "angle" | "text";
  angle?: "up" | "down";
  color?: "primary" | "secondary" | "outline" | "destructive";
  size?: "base" | "small";
  children?: React.ReactNode;
  className?: string;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "base", angle, color, size, children, className, ...props },
    ref
  ) => {
    const button = tv({
      base: "cursor-pointer hover:opacity-90 transition",
      variants: {
        variant: {
          base: " flex justify-center items-center gap-2 text-base",
          add: "",
          delete: "leading-none",
          photo: "rounded-full flex items-center justify-center",
          angle: "",
          text: "md:hover:underline md:hover:underline-offset-4 max-md:underline max-md:underline-offset-4",
        },
        color: {
          primary: cn(
            variant === "add" ? "text-primary" : "bg-primary text-white"
          ),
          secondary: cn(variant === "add" ? "text-secondary" : "bg-secondary"),
          outline: cn(variant === "add" ? null : "bg-white border border-gray"),
          destructive: cn(
            variant === "add"
              ? "text-destructive"
              : "hover:opacity-100 md:bg-secondary md:hover:bg-destructive md:hover:text-white  max-md:bg-destructive max-md:text-white"
          ),
        },
        size: {
          base: cn(
            variant === "base" && "p-2.5 rounded-lg ",
            variant === "add" && "md:text-[40px] max-md:text-4xl",
            variant === "delete" && "p-3",
            variant === "photo" && "w-14 h-14 text-2xl",
            variant === "angle" && "text-sm"
          ),
          small: cn(
            variant === "base" &&
              "md:p-2 md:rounded-lg max-md:p-1.5 max-md:rounded-md max-md:text-sm",
            variant === "add" &&
              "text-xl align-middle px-1 -mt-1 cursor-default hover:opacity-100"
          ),
        },
      },
      compoundVariants: [
        {
          variant: ["base"],
          class: "text-center",
        },
      ],
      defaultVariants: {
        variant: "base",
        size: "base",
      },
    });
    return (
      <button
        className={cn(
          button({ variant: variant, color: color, size: size }),
          className
        )}
        {...props}
        ref={ref}
      >
        {variant === "base" || variant === "text" ? (
          <>{children}</>
        ) : variant === "add" ? (
          <FaCirclePlus />
        ) : variant === "delete" ? (
          <FaXmark />
        ) : variant === "photo" ? (
          <FaCamera />
        ) : variant === "angle" && angle === "up" ? (
          <FaArrowUp />
        ) : variant === "angle" && angle === "down" ? (
          <FaArrowDown />
        ) : null}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
