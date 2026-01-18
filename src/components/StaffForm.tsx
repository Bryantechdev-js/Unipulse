"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { roles } from "./types";

type StaffFormProps = {
  staffName: string;
  setStaffName: (name: string) => void;
  role: string;
  setRole: (role: string) => void;
  type: string;
  setType: (type: string) => void;
  department: string;
  setDepartment: (dept: string) => void;
  checkingIn: boolean;
  handleCheckIn: () => void;
};

export const StaffForm: React.FC<StaffFormProps> = ({
  staffName,
  setStaffName,
  role,
  setRole,
  type,
  setType,
  department,
  setDepartment,
  checkingIn,
  handleCheckIn,
}) => {
  // Update type and department when role changes
  React.useEffect(() => {
    setType(roles[role].type[0]);
    setDepartment(roles[role].departments[0]);
  }, [role, setType, setDepartment]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
      {/* Staff Name */}
      <div className="flex flex-col">
        <Label>Staff Name</Label>
        <input
          className="border rounded px-2 py-1 dark:bg-slate-800 dark:text-white"
          placeholder="Enter staff name"
          value={staffName}
          onChange={(e) => setStaffName(e.target.value)}
        />
      </div>

      {/* Role */}
      <div className="flex flex-col">
        <Label>Role</Label>
        <Select value={role} onValueChange={(val) => setRole(val as string)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(roles).map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Type */}
      <div className="flex flex-col">
        <Label>Type</Label>
        <Select value={type} onValueChange={(val) => setType(val as string)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            {roles[role].type.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Department */}
      <div className="flex flex-col">
        <Label>Department</Label>
        <Select value={department} onValueChange={(val) => setDepartment(val as string)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {roles[role].departments.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Check-in Button */}
      <Button
        className="w-full"
        onClick={handleCheckIn}
        disabled={checkingIn || !staffName}
      >
        {checkingIn ? "Checking In..." : "Check In"}
      </Button>
    </div>
  );
};
