import type { Metadata } from "next";
import StoreProvider from "@/components/providers/StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import ReactQuery from "@/components/providers/ReactQuery";
import SessionWraper from "@/components/providers/SessionWraper";
import { Navbar } from "@/components/common";
import { JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "LearnIt",
};
export const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  fallback: ["monospace"],
});
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
            <body
              className={`flex flex-col min-h-screen ${jetbrains_mono.className}`}
            >
              <Navbar />
              <main className="grow">{children}</main>
              <Toaster position="top-center" />
            </body>
          </StoreProvider>
        </ReactQuery>
      </SessionWraper>
    </html>
  );
}
