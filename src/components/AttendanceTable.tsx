"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AttendanceLog } from "./types";

export function AttendanceTable({
  attendanceLog,
  handleCheckOut,
  checkingOut,
}: {
  attendanceLog: AttendanceLog[];
  handleCheckOut: (id: string) => void;
  checkingOut: boolean;
}) {
  const badge = (status: AttendanceLog["status"]) =>
    status === "Late"
      ? "destructive"
      : status === "Present"
      ? "default"
      : "outline";

  return (
    <div className="border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Staff</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {attendanceLog.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.date}</TableCell>
              <TableCell>{log.staffName}</TableCell>
              <TableCell>{log.role}</TableCell>
              <TableCell>
                <Badge variant="outline">{log.staffType}</Badge>
              </TableCell>
              <TableCell>{log.department}</TableCell>
              <TableCell>{log.checkIn ?? "—"}</TableCell>
              <TableCell>{log.checkOut ?? "—"}</TableCell>
              <TableCell>
                <Badge variant={badge(log.status)}>
                  {log.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  disabled={!!log.checkOut || checkingOut}
                  onClick={() => handleCheckOut(log.id)}
                >
                  Check Out
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
