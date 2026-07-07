import { useEffect, useState } from "react";
import { Mail, MailOpen, Send, Star, ShieldAlert, CircleAlert } from "lucide-react";
import StatsCard from "./StatsCard";
import analyticsService from "../../services/analyticsService";

export default function DashboardStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    analyticsService.getOverview().then(setStats).catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      <StatsCard icon={Mail} label="Total Emails" value={stats?.total} color="blue" />
      <StatsCard icon={MailOpen} label="Unread" value={stats?.unread} color="yellow" />
      <StatsCard icon={Send} label="Sent" value={stats?.sent} color="green" />
      <StatsCard icon={CircleAlert} label="Important" value={stats?.important} color="red" />
      <StatsCard icon={Star} label="Starred" value={stats?.starred} color="purple" />
      <StatsCard icon={ShieldAlert} label="Spam" value={stats?.spam} color="red" />
    </div>
  );
}