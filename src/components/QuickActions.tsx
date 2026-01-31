"use client";

import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="space-y-3">
        <Button className="w-full">Create Announcement</Button>
        <Button variant="outline" className="w-full">
          View Reports
        </Button>
        <Button variant="secondary" className="w-full">
          Manage Staff
        </Button>
      </div>
    </div>
  );
}
