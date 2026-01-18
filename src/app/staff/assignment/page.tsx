// app/assignments/create/page.tsx

import AssignmentCreateForm from "@/components/AssignmentCreateForm";

// import AssignmentCreateForm from "./AssignmentCreateForm";

export default async function CreateAssignmentPage() {
  // 🔐 Later: check lecturer auth here
  // 📚 Later: fetch departments / courses here

  return (
    <div className="min-h-screen bg-background">
      <AssignmentCreateForm />
    </div>
  );
}
