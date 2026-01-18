"use client";

import { AttendanceTable } from "@/components/AttendanceTable";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { StaffForm } from "@/components/StaffForm";
import { AttendanceLog, roles } from "@/components/types";
import React, { useState, useEffect } from "react";
// import { StaffForm } from "./components/StaffForm";
// import { AttendanceTable } from "./components/AttendanceTable";
// import { roles, type AttendanceLog } from "./components/types";
// import { Skeleton } from "@/components/ui/skeleton";

export default function StaffAttendancePage() {
  const [role, setRole] = useState("Lecturer");
  const [department, setDepartment] = useState(roles["Lecturer"][0]);
  const [staffName, setStaffName] = useState("");
  const [attendanceLog, setAttendanceLog] = useState<AttendanceLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [type, setType] = useState(roles[role].type[0]);

  // Fetch initial attendance data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAttendanceLog([
        {
          id: "1",
          staffName: "John Doe",
          role: "Lecturer",
          department: "Engineering",
          date: "2026-01-17",
          checkIn: "08:55",
          checkOut: "17:05",
          status: "Present",
        },
        {
          id: "2",
          staffName: "Jane Smith",
          role: "Office Staff",
          department: "Finance",
          date: "2026-01-17",
          checkIn: "09:15",
          status: "Late",
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // Update department when role changes
  useEffect(() => {
    setDepartment(roles[role][0]);
  }, [role]);

  // Handle Check-in
  const handleCheckIn = () => {
    if (!staffName) return alert("Please enter staff name");
    setCheckingIn(true);
    setTimeout(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const status = now.getHours() >= 9 ? "Late" : "Present";

      setAttendanceLog([
        ...attendanceLog,
        {
          id: Date.now().toString(),
          staffName,
          role,
          department,
          date: now.toISOString().split("T")[0],
          checkIn: `${hours}:${minutes}`,
          status,
        },
      ]);
      setCheckingIn(false);
      setStaffName("");
    }, 500);
  };

  // Handle Check-out
  const handleCheckOut = (id: string) => {
    setCheckingOut(true);
    setTimeout(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setAttendanceLog(
        attendanceLog.map((log) =>
          log.id === id ? { ...log, checkOut: `${hours}:${minutes}` } : log
        )
      );
      setCheckingOut(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white dark:bg-card p-6 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-gray-400 dark:text-muted-foreground text-center">
          Staff Attendance
        </h1>

        <StaffForm
          staffName={staffName}
          setStaffName={setStaffName}
          role={role}
          setRole={setRole}
          type={type}
          setType={setType}
          department={department}
          setDepartment={setDepartment}
          checkingIn={checkingIn}
          handleCheckIn={handleCheckIn}
        />

        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <SkeletonLoader key={i} className="h-8 w-full rounded" />
            ))}
          </div>
        ) : (
          <AttendanceTable
            attendanceLog={attendanceLog}
            handleCheckOut={handleCheckOut}
            checkingOut={checkingOut}
          />
        )}
      </div>
    </div>
  );
}
