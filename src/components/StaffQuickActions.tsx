// app/staff/components/StaffQuickActions.tsx

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Staff Attendance",
    description: "Check in, check out, and manage attendance records",
    href: "/staff/attendance",
  },
  {
    title: "Assignments",
    description: "Create and manage assignments for your courses",
    href: "/assignments/create",
  },
  {
    title: "Upload Resources",
    description: "Share learning materials with students",
    href: "/resources/upload",
  },
  {
    title: "Attendance History",
    description: "View daily and monthly attendance summaries",
    href: "/staff/attendance/history",
  },
];

export default function StaffQuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((action) => (
        <Link key={action.title} href={action.href}>
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">
                {action.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
