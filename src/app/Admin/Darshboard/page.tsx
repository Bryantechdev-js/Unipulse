
import StatsCards from "@/components/Admin/StatsCard";
import AttendanceChart from "@/components/AttendanceChart";
import CampusIssuesTable from "@/components/CampusIssuesTable";
// import CampusIssuesTable from "@/components/CampusIssuesTable";
import QuickActions from "@/components/QuickActions";
import SuggestionsTable from "@/components/SuggestionsTable";

export default async function AdminDashboardPage() {
  // Later: fetch analytics here (Prisma / API)
  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <CampusIssuesTable className="xl:col-span-2" />
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SuggestionsTable className="xl:col-span-2" />
        <AttendanceChart />
      </div>
    </div>
  );
}
