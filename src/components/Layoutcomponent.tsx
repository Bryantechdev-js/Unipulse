"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Eventsidebar from "./Eventsidebar";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "./them-provider";
import Footer from "./Footer";

function Layoutcomponent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures rendering only after client mount
  }, []);

  const isAuth = mounted && (pathname === "/login" || pathname === "/register");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="sticky top-0 z-50">{!isAuth && <Navbar />}</div>
      <div className="wrapper flex">
        <div className="flex-1 top-0 bottom-0">{!isAuth && <Eventsidebar />}</div>
        <div className="w-full flex justify-center items-center">{children}</div>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default Layoutcomponent;
