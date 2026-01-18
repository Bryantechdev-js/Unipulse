// types.ts
export const roles: Record<string, { type: string[]; departments: string[] }> = {
  Lecturer: {
    type: ["Full-Time", "Part-Time"],
    departments: ["Engineering", "Science", "Arts", "Business"],
  },
  "Office Staff": {
    type: ["Full-Time", "Part-Time"],
    departments: ["Admin", "Finance", "HR"],
  },
  "Maintenance Staff": {
    type: ["Full-Time", "Part-Time"],
    departments: ["Maintenance", "Facilities"],
  },
};


// types.ts
export type AttendanceStatus = "Present" | "Late" | "Absent" | "Early Leave";

export type AttendanceLog = {
  id: string;
  staffName: string;
  role: string;
  staffType: "Full-Time" | "Part-Time";
  department: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
};
