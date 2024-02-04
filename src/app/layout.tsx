import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderPage from "@/components/Header";
import { Toaster } from "sonner";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased py-2`}>
        <SessionProvider session={session}>
          <HeaderPage />
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
            <Toaster />
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
