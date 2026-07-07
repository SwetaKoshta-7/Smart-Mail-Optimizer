import { useAuth } from "../../hooks/useAuth";
import { LogOut } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white rounded-2xl border p-6">
      <h2 className="font-semibold text-slate-800 mb-5">Profile</h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}`}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="font-semibold text-lg">{user?.name}</p>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="border-t pt-5">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </div>
  );
}