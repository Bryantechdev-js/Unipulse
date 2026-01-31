// app/assignments/page.tsx

// import { getAssigmentAction } from "@/action/getAssigmentAction";
// import AssignmentFilters from "@/components/StudentassignmentFilters";
import { getAssignmentAction } from "@/action/getAssigmentAction";
import AssignmentList from "@/components/StudentassignmentList";

// import AssignmentFilters from "./components/AssignmentFilters";
// import AssignmentList from "./components/AssignmentList";

export default async function ViewAssignmentsPage() {
  const result = await getAssignmentAction();
  console.log("Assignments fetched:", result.data[0].department, result.data[0].id,result);
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

        <AssignmentList assignments={result?.data} />
      </div>
    </div>
  );
}
