import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from 'react'

interface LogoProps 
extends Omit<ComponentPropsWithoutRef<'svg'>, "className"> {
  className?: string;
}

const Logo = ({ className,...props }: LogoProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current", className)}
      role="img"
      {...props}
    >
      <path d="M17.7294 0.272727V17.7273H14.0391V0.272727H17.7294Z" />
      <path d="M0 17.7273V0.272727H11.5568V3.31534H3.69034V7.47443H10.7898V10.517H3.69034V17.7273H0Z" />
    </svg>
  );
};

export default Logo;
