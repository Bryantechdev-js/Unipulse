"use client";

import { useForm, Controller } from "react-hook-form";
import AssignmentCard from "./AssignmentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterForm = {
  department?: string;
  course?: string;
  status?: string;
};

export default function AssignmentList({
  assignments,
}: {
  assignments: any[];
}) {
  const { control, watch } = useForm<FilterForm>({
    defaultValues: {
      department: "",
      course: "",
      status: "",
    },
  });

  // 👀 watch filters
  const department = watch("department");
  const course = watch("course");
  const status = watch("status");

  // 🔎 filter assignments
  const filteredAssignments = assignments.filter((a) => {
    if (department && a.department !== department) return false;
    if (course && a.course !== course) return false;
    if (status && a.status !== status) return false;
    return true;
  });

  return (
    <div>
      {/* FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-card p-4 rounded-lg border">
        {/* Department */}
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ENGINEERING">Engineering</SelectItem>
                <SelectItem value="AGRICULTURE">Agriculture</SelectItem>
                <SelectItem value="HEALTH">Health</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {/* Course */}
        <Controller
          name="course"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(
                  new Set(assignments.map((a) => a.course))
                ).map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* RESULTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">
            No assignments match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
