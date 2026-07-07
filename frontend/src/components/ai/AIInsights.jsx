import { useEffect, useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import analyticsService from "../../services/analyticsService";

export default function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    analyticsService
      .getInsights()
      .then((res) => setInsights(res.insights))
      .catch(() => setError("Couldn't generate insights right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="text-purple-600" />
        <h3 className="font-semibold text-purple-700">AI Insights</h3>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <LoaderCircle size={16} className="animate-spin" />
          Analyzing your inbox...
        </div>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <ul className="space-y-2">
          {insights.map((insight, i) => (
            <li key={i} className="text-sm text-gray-700 flex gap-2">
              <span className="text-purple-500">•</span>
              {insight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}