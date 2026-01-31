"use client";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Total Students", value: "1,500", sub: "Enrolled this year" },
  { label: "Active Staff", value: "120", sub: "Across departments" },
  { label: "Open Issues", value: "7", sub: "Needs attention" },
  { label: "Today's Attendance", value: "85%", sub: "+5% from yesterday" },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <h2 className="text-2xl font-bold">{s.value}</h2>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
