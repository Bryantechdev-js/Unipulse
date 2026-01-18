import StaffGreeting from "@/components/StaffGreeting";
import StaffQuickActions from "@/components/StaffQuickActions";


export default function StaffPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <StaffGreeting />
        <StaffQuickActions />
      </div>
    </div>
  );
}
