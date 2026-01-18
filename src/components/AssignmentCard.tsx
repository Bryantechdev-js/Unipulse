// app/assignments/components/AssignmentCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Assignment = {
  id: string;
  title: string;
  course: string;
  department: string;
  deadline: string;
  lecturer: string;
  status: "Open" | "Closed";
};

export default function AssignmentCard({ assignment }: { assignment: Assignment }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">
          {assignment.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Course: <span className="font-medium">{assignment.course}</span>
        </p>

        <p className="text-sm text-muted-foreground">
          Lecturer: {assignment.lecturer}
        </p>

        <p className="text-sm text-muted-foreground">
          Deadline: {assignment.deadline}
        </p>

        <div className="flex items-center justify-between pt-2">
          <Badge variant={assignment.status === "Open" ? "default" : "secondary"}>
            {assignment.status}
          </Badge>

          <Link
            href={`/assignments/${assignment.id}`}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            View Details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
