

"use client";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { BProgress } from "@bprogress/core";
import { useEffect, useState } from "react";

const ProgressBar = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    BProgress.configure({
      minimum: 0.99,
      maximum: 1,
      showSpinner: false, 
      speed: 200, 
      trickle: false, 
    });
  }, []);


  return (
    <ProgressProvider
      height="4px"
      color="oklch(0.645 0.246 16.439)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export  {ProgressBar};






