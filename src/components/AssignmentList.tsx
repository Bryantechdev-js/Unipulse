"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const assignments = [
  { id: "1", title: "Data Structures – Assignment 1", due: "Oct 20" },
  { id: "2", title: "Database Systems – Project", due: "Oct 28" },
];

export default function AssignmentList() {
  return (
    <div className="grid gap-4">
      {assignments.map((a) => (
        <Link key={a.id} href={`/student/assignments/${a.id}`}>
          <Card className="hover:shadow-md transition">
            <CardContent className="p-4 flex justify-between">
              <span>{a.title}</span>
              <span className="text-sm text-muted-foreground">
                Due {a.due}
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
