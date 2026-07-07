import DashboardStats from "../components/analytics/DashboardStats";
import ActivityChart from "../components/analytics/ActivityChart";
import CategoryPieChart from "../components/analytics/CategoryPieChart";
import AIInsights from "../components/ai/AIInsights";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your inbox activity</p>
      </div>

      <DashboardStats />

      <AIInsights />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ActivityChart />
        <CategoryPieChart />
      </div>
    </div>
  );
}