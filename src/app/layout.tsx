import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layoutcomponent from "@/components/Layoutcomponent";
import { cookies } from "next/headers";
import { verifyAuth } from "@/lib/verifyAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniPulse",
  description: "Enterprise Student Management System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("loginToken")?.value as string;
  const user = await verifyAuth(token);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Layoutcomponent role={user?.role}>
          {children}
        </Layoutcomponent>
      </body>
    </html>
  );
}
