"use client";

import {
  AlertCircle,
  Bug,
  FileText,
  HomeIcon,
  MemoryStick,
  Menu,
  MessageSquare,
  Upload,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserRole } from "@/types/auth";
import { logout } from "@/lib/logout";
import { toast } from "sonner";

export default function EventSidebar({ authRole }: { authRole?: UserRole }) {
  const router = useRouter();
  console.log("the side bar auth", authRole);

  const role: UserRole = authRole ?? "STUDENT";
  const staff =
    role === "LECTURER" || role === "OFFICE" || role === "MAINTENANCE";

  const logoutfunc=async()=>{
    const result = await logout()
    if(!result.success){
      toast.error('failed to logout')
      return;
    }
    toast.success(result.message)
    router.refresh()
  }  

  const SidebarContent = (
    <div className="w-64 border-r min-h-screen p-4 bg-background">
      <nav className="space-y-1">
        <SidebarButton
          icon={<HomeIcon />}
          label={
            staff
              ? "Staff Dashboard"
              : role === "ADMIN"
                ? " Admin Dashboard "
                : "Home"
          }
          onClick={() =>
            router.push(
              `${staff ? "/staff" : role === "ADMIN" ? "/Admin" : "/"}`,
            )
          }
        />

        <SidebarButton
          icon={<Bug />}
          label="Issues"
          onClick={() => router.push("/Issue")}
        />

        { role == "STUDENT" || role === "LECTURER" && (
          <SidebarButton
            icon={<AlertCircle />}
            label="View Assignments"
            onClick={() => router.push("/student/assigment/view")}
          />
        )}

        <SidebarButton
          icon={<MessageSquare />}
          label="Suggestions"
          onClick={() => router.push("/Suggestions")}
        />

        {role === "LECTURER" && (
          <>
            <SidebarButton icon={<Upload />} label="Upload Resources" onClick={()=>router.push('/staff/upload')} />
            <SidebarButton icon={<FileText />} label="Submited Assignments" onClick={()=>router.push('/student/assigment/[id]/submit')} />
            <SidebarButton icon={<MemoryStick/>} label="Events" onClick={()=>router.push('/')} />
            <SidebarButton icon={<Users />} label="Attendance" onClick={()=>router.push('/staff/attendance')} />
            <SidebarButton icon={<Users />} label="create assignment" onClick={()=>router.push('/staff/assignment')} />
          </>
        )}

        {role === "ADMIN" && (
          <>
            <SidebarButton icon={<Upload />} label="View Events" onClick={()=>router.push('/')} />
            <SidebarButton icon={<FileText />} label="Submit Event" onClick={()=>router.push('/events/create')} />
          </>
        )}
      </nav>

      <div className="mt-10">
        <SidebarButton label="Logout"  onClick={logoutfunc}/>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 bg-white rounded shadow">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <aside className="hidden lg:block">{SidebarContent}</aside>
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
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
      text-muted-foreground hover:bg-red-50 hover:text-red-700 transition"
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
