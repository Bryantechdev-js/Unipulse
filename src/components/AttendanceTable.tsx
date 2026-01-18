"use client";

import React from "react";
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

type AttendanceTableProps = {
  attendanceLog: AttendanceLog[];
  handleCheckOut: (id: string) => void;
  checkingOut: boolean;
};

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendanceLog,
  handleCheckOut,
  checkingOut,
}) => {
  const getBadgeVariant = (status: AttendanceLog["status"]) => {
    switch (status) {
      case "Present":
        return "default";
      case "Late":
        return "destructive";
      case "Early Leave":
        return "secondary";
      case "Absent":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border">
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
          {attendanceLog.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-muted-foreground py-6">
                No attendance records for today
              </TableCell>
            </TableRow>
          ) : (
            attendanceLog.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.date}</TableCell>

                <TableCell className="font-medium">
                  {log.staffName}
                </TableCell>

                <TableCell>{log.role}</TableCell>

                <TableCell>
                  <Badge variant="outline">{log.staffType}</Badge>
                </TableCell>

                <TableCell>{log.department}</TableCell>

                <TableCell>{log.checkIn ?? "—"}</TableCell>

                <TableCell>{log.checkOut ?? "—"}</TableCell>

                <TableCell>
                  <Badge variant={getBadgeVariant(log.status)}>
                    {log.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={!!log.checkOut || checkingOut}
                    onClick={() => handleCheckOut(log.id)}
                  >
                    {checkingOut ? "Checking out..." : "Check Out"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
