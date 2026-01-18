// app/assignments/page.tsx

import AssignmentFilters from "@/components/StudentassignmentFilters";
import AssignmentList from "@/components/StudentassignmentList";

// import AssignmentFilters from "./components/AssignmentFilters";
// import AssignmentList from "./components/AssignmentList";

export default function ViewAssignmentsPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-red-600">
            Assignments
          </h1>
          <p className="text-muted-foreground">
            View and track assignments assigned to your department and courses.
          </p>
        </header>

        <AssignmentFilters />
        <AssignmentList />
      </div>
    </div>
  );
}
