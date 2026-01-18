// app/assignments/components/AssignmentList.tsx

import AssignmentCard from "./AssignmentCard";

const assignments = [
  {
    id: "1",
    title: "Data Structures – Assignment 1",
    course: "Data Structures",
    department: "Engineering",
    deadline: "2026-02-10",
    lecturer: "Dr. John Doe",
    status: "Open",
  },
  {
    id: "2",
    title: "Database Design Project",
    course: "Databases",
    department: "Engineering",
    deadline: "2026-02-05",
    lecturer: "Prof. Jane Smith",
    status: "Closed",
  },
];

export default function AssignmentList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
}
