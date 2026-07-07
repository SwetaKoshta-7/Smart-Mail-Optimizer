import { useState } from "react";
import Profile from "../components/settings/Profile";
import Preferences from "../components/settings/Preferences";

export default function Settings() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Settings</h1>

      <div className="flex gap-3 border-b">
        {["profile", "preferences"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition ${
              tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "profile" ? <Profile /> : <Preferences />}
    </div>
  );
}