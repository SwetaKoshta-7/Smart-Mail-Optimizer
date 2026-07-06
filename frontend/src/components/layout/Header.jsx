import {
  Bell,
  CircleHelp,
  Settings,
  Search,
} from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b">

      <div className="flex items-center justify-between px-8 py-4">

        {/* Search */}

        <div className="w-[480px] relative">

          <Search
            size={20}
            className="absolute left-4 top-3 text-gray-400"
          />

          <input
            placeholder="Search mail..."
            className="w-full rounded-xl bg-gray-100 pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          <CircleHelp
            className="cursor-pointer text-gray-600"
          />

          <Bell
            className="cursor-pointer text-gray-600"
          />

          <Settings
            className="cursor-pointer text-gray-600"
          />

          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">

            US

          </div>

        </div>

      </div>

    </header>
  );
}