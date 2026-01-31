"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { roless } from "./types";
// import { roles } from "./types";

export type AttendanceFormValues = {
  staffName: string;
  role: string;
  staffType: string;
  department: string;
};

export function StaffForm({
  onSubmit,
  checkingIn,
}: {
  onSubmit: (data: AttendanceFormValues) => void;
  checkingIn: boolean;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AttendanceFormValues>({
    defaultValues: {
      role: "Lecturer",
      staffType: roless["Lecturer"].type[0],
      department: roless["Lecturer"][0],
    },
  });

  const role = watch("role");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      {/* Staff Name */}
      <div>
        <Input
          placeholder="Staff name"
          {...register("staffName", { required: "Staff name is required" })}
        />
        {errors.staffName && (
          <p className="text-xs text-red-500">
            {errors.staffName.message}
          </p>
        )}
      </div>

      {/* Role */}
      <Select
        defaultValue="Lecturer"
        onValueChange={(val) => {
          setValue("role", val);
          setValue("staffType", roless[val].type[0]);
          setValue("department", roless[val][0]);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(roless).map((r) => (
            <SelectItem key={r} value={r}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Staff Type */}
      <Select
        defaultValue={roless[role].type[0]}
        onValueChange={(val) => setValue("staffType", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Staff Type" />
        </SelectTrigger>
        <SelectContent>
          {roless[role].type.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Department */}
      <Select
        defaultValue={roless[role][0]}
        onValueChange={(val) => setValue("department", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          {roless[role].map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        type="submit"
        className="md:col-span-4"
        disabled={checkingIn}
      >
        {checkingIn ? "Checking in..." : "Check In"}
      </Button>
    </form>
  );
}
