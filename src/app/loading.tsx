"use client";

import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  const size = 50;
  const color = "var(--color-foreground)";

  return (
    <div className="h-screen flex justify-center items-center md:-mt-[108px] max-md:-mt-[50px]">
      <ClipLoader size={size} color={color} className="spinner-container" />
    </div>
  );
};

export default LoadingSpinner;
