// src/app/layout.tsx
import { Roboto } from "next/font/google";

import type { Metadata } from "next";
import { ReduxProvider } from "../ReduxProvider";
import "../globals.css";

import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Synapse Store",
  description: "Synapse Store",
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add suppressHydrationWarning if you see hydration warnings related to theme
    <html lang="en" suppressHydrationWarning className={roboto.variable}>
      <body className="antialiased">
        {/* ReduxProvider and other global providers */}
        <ReduxProvider>
          <>
            <Navbar />
            <main className="pt-10" >{children}</main>
          </>
        </ReduxProvider>
      </body>
    </html>
  );
}
