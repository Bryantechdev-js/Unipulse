// app/staff/components/StaffGreeting.tsx

export default function StaffGreeting() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow">
      <h1 className="text-3xl font-bold text-red-600">
        Welcome to UniPulse Staff Portal
      </h1>

      <p className="mt-2 text-muted-foreground max-w-2xl">
        Manage attendance, assignments, and academic resources efficiently.
        Select an action below to get started.
      </p>
    </div>
  );
}
