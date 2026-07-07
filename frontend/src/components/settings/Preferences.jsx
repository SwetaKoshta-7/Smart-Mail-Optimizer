import { useThemeContext } from "../../context/ThemeContext";
import { useState } from "react";
import { Moon, Sun, Bell, Mail } from "lucide-react";

export default function Preferences() {
  const { theme, toggleTheme } = useThemeContext();
  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  return (
    <div className="bg-white rounded-2xl border p-6 space-y-6">
      <h2 className="font-semibold text-slate-800">Preferences</h2>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          <div>
            <p className="font-medium">Dark mode</p>
            <p className="text-sm text-gray-500">Switch between light and dark theme</p>
          </div>
        </div>

        <Toggle checked={theme === "dark"} onChange={toggleTheme} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell size={20} />
          <div>
            <p className="font-medium">Notifications</p>
            <p className="text-sm text-gray-500">Get notified about new emails</p>
          </div>
        </div>

        <Toggle checked={notifications} onChange={() => setNotifications((v) => !v)} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail size={20} />
          <div>
            <p className="font-medium">Daily digest</p>
            <p className="text-sm text-gray-500">Receive a daily summary email</p>
          </div>
        </div>

        <Toggle checked={emailDigest} onChange={() => setEmailDigest((v) => !v)} />
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-12 h-7 rounded-full transition relative ${checked ? "bg-blue-600" : "bg-gray-300"}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}