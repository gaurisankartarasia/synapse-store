import { ReduxProvider } from "../ReduxProvider";
import "../globals.css";



export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
      <html lang="en" suppressHydrationWarning >
      <body className="antialiased">
        {/* ReduxProvider and other global providers */}
        <ReduxProvider>
          <>
            <main>{children}</main>
          </>
        </ReduxProvider>
      </body>
    </html>
    )
}