import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import analyticsService from "../../services/analyticsService";

export default function ActivityChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsService
      .getActivity(14)
      .then((res) => setData(res.activity))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="font-semibold text-slate-800 mb-4">Email Activity (last 14 days)</h3>

      {loading ? (
        <div className="h-64 flex items-center justify-center text-gray-400">Loading...</div>
      ) : data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-400">
          No activity data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="received" stroke="#2563eb" strokeWidth={2} name="Received" />
            <Line type="monotone" dataKey="sent" stroke="#16a34a" strokeWidth={2} name="Sent" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}