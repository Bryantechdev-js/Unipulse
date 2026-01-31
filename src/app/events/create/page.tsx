// import CreateEventForm from "./components/CreateEventForm";

import CreateEventForm from "@/components/createEventForm";

export default function CreateEventPage() {
  return (
    <div className="p-6 max-w-350 mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create Event</h1>
        <p className="text-gray-500">
          Create and publish events for students and staff
        </p>
      </div>
      <CreateEventForm />
    </div>
  );
}
