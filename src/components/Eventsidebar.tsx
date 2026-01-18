"use client";

import {
  AlertCircle,
  Bug,
  CheckCircle,
  FileText,
  HomeIcon,
  Menu,
  MessageSquare,
  Upload,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function EventSidebar() {
  const router = useRouter();
  const role = "student"; // change to "staff" to test

  const SidebarContent = (
    <div className="w-64 bg-background border-r-2 border-gray-200 min-h-screen p-4">
      <nav className="space-y-1">
        {/* ALWAYS VISIBLE */}
        <SidebarButton
          icon={<HomeIcon />}
          label={role === "staff" ? "Staff Dashboard" : "Home"}
          onClick={() => router.push(`/${role === "staff" ? "staff" : ""}`)}
        />

        <SidebarButton
          icon={<Bug />}
          label="Issues"
          onClick={() => router.push("/Issue")}
        />
        <SidebarButton
          icon={<AlertCircle />}
          label="Assignments"
          onClick={() => router.push("/student/assigment/view")}
        />

        <SidebarButton
          icon={<MessageSquare />}
          label="Suggestions"
          onClick={() => router.push("/Suggestions")}
        />

        {/* STAFF ONLY */}
        {role === "staff" && (
          <>
            <SidebarButton icon={<Upload />} label="Upload Resources"  onClick={()=>router.push("/staff/upload")}/>
            <SidebarButton icon={<FileText />} label="Assignments" onClick={()=> router.push('/staff/assignment')} />
            <SidebarButton icon={<Users />} label="Attendance" onClick={()=>router.push("/staff/attendance")} />
            {/* <SidebarButton icon={<Users />} label="Assignment" onClick={()=>router.push("/student/assignment/view")} /> */}
          </>
        )}
      </nav>

      <div className="mt-auto pt-10">
        <SidebarButton label="Logout" />
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <button className="bg-white p-2 rounded-md shadow">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0">
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP */}
      <aside className="hidden lg:block sticky top-0 left-0 z-40">
        {SidebarContent}
      </aside>
    </>
  );
}

function SidebarButton({
  icon,
  label,
  onClick,
}: {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground
      hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
