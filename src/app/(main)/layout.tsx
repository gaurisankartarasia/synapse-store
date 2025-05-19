// src/app/layout.tsx

import type { Metadata } from "next";

import Navbar from "@/components/navbar/Navbar";

import { ProgressBar } from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "Synapse Store",
  description: "Synapse Store",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProgressBar>
        <Navbar />
        <main className="pt-10">{children}</main>
      </ProgressBar>
    </>
  );
}
