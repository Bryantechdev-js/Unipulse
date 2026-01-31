"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Present", value: 85 },
  { name: "Absent", value: 15 },
];

const COLORS = ["#ef4444", "#cbd5e1"];

export default function AttendanceChart() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Attendance Overview
      </h2>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          Present (85%)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-slate-300 rounded-full" />
          Absent (15%)
        </div>
      </div>
    </div>
  );
}
