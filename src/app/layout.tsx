import type { Metadata } from "next";

import "../styles/globals.css";
import StoreProvider from "@/components/providers/StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import ReactQuery from "@/components/providers/ReactQuery";
import SessionWraper from "@/components/providers/SessionWraper";
import NavBar from "@/components/common/NavBar";

export const metadata: Metadata = {
  title: "LearnIt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionWraper>
        <ReactQuery>
          <StoreProvider>
            <body className="flex flex-col min-h-screen bg-purple-100">
              <NavBar />
              <main className="grow">{children}</main>
              <Toaster />
            </body>
          </StoreProvider>
        </ReactQuery>
      </SessionWraper>
    </html>
  );
}
