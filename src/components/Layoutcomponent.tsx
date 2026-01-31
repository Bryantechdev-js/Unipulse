"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import EventSidebar from "./Eventsidebar";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "./them-provider";
import Footer from "./Footer";
import { toast, Toaster } from "sonner";
import { UserRole } from "@/types/auth";

type LayoutProps = {
  role?: UserRole;
  children: React.ReactNode;
};

export default function Layoutcomponent({ role, children }: LayoutProps) {
  // checking if the user is online

  const online = navigator.onLine;
  if(!online){
     toast.error('it seems like you are offline')
     return;
  }
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage =
    mounted && (pathname === "/login" || pathname === "/register");

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {!isAuthPage && <Navbar />}

      <div className="flex min-h-screen">
        {!isAuthPage && <EventSidebar authRole={role} />}

        <main className="flex-1 p-6">{children}</main>
      </div>

      <Footer />
      <Toaster />
    </ThemeProvider>
  );
}
