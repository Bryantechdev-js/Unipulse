"use client";

export default function CampusIssuesTable({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Campus Issues</h2>
      <p className="text-sm text-muted-foreground">
        No reported issues yet.
      </p>
    </div>
  );
}
