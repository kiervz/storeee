import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import SessionProvider from "@/app/providers/session-provider";
import { ToastProvider } from "@/app/providers/toast-provider";
import QueryClientProvider from "@/app/providers/query-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store Admin",
  description: "Kvey Store Admin Panel",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <QueryClientProvider>
            <ToastProvider />
            <main className="w-full h-full">{children}</main>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
