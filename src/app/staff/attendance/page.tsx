"use client";

import { useEffect, useState } from "react";
// import { StaffForm } from "@/components/StaffForm";
import { AttendanceTable } from "@/components/AttendanceTable";
import { AttendanceLog } from "@/components/types";
import { getTodayAttendance } from "@/action/getAttendance";
import { checkInAction } from "@/action/checkingAction";
import { checkOutAction } from "@/action/checkout";
import { StaffForm } from "@/components/StaffForm";
// import {
//   checkInAction,
//   checkOutAction,
//   getTodayAttendance,
// // } from "@/actions/attendance.actions";

export default function StaffAttendancePage() {
  const [attendanceLog, setAttendanceLog] = useState<AttendanceLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    getTodayAttendance().then((res) => {
      if (res.success) setAttendanceLog(res.data);
      setLoading(false);
    });
  }, []);

  const handleCheckIn = async (data: any) => {
    setCheckingIn(true);
    const res = await checkInAction(data);
    if (res.success) {
      const updated = await getTodayAttendance();
      if (updated.success) setAttendanceLog(updated.data);
    }
    setCheckingIn(false);
  };

  const handleCheckOut = async (id: string) => {
    setCheckingOut(true);
    const res = await checkOutAction(id);
    if (res.success) {
      const updated = await getTodayAttendance();
      if (updated.success) setAttendanceLog(updated.data);
    }
    setCheckingOut(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Staff Attendance
      </h1>

      <StaffForm
        onSubmit={handleCheckIn}
        checkingIn={checkingIn}
      />

      {!loading && (
        <AttendanceTable
          attendanceLog={attendanceLog}
          handleCheckOut={handleCheckOut}
          checkingOut={checkingOut}
        />
      )}
    </div>
  );
}
