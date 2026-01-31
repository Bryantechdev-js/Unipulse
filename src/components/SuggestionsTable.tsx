"use client";

export default function SuggestionsTable({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Suggestions</h2>
      <p className="text-sm text-muted-foreground">
        No suggestions available.
      </p>
    </div>
  );
}
