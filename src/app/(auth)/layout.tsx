import { ReduxProvider } from "../ReduxProvider";
import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin",
  description: "Synapse Store",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
     
        <ReduxProvider>
          <>
            <main className="antialiased bg-muted" >{children}</main>
          </>
        </ReduxProvider>
     
    )
}