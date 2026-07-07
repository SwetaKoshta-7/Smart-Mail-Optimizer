import {
  Bell,
  CircleHelp,
  Settings,
  Search,
  ChevronDown,
  Command,
} from "lucide-react";

export default function Header({
  user = {
    name: "Shivansh Gupta",
    initials: "SG",
  },
  onSearch,
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">

      <div className="flex items-center justify-between px-8 py-4">

        {/* Search */}

        <div className="relative w-full max-w-xl">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search emails, sender, subject..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              pl-11
              pr-20
              py-3
              text-sm
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200
            "
          />

          {/* Shortcut */}

          <div className="absolute right-3 top-1/2 -translate-y-1/2">

            <div className="flex items-center gap-1 rounded-lg border bg-white px-2 py-1 text-xs text-gray-500">

              <Command size={12} />

              K

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3 ml-8">

          {/* Help */}

          <button
            className="h-10 w-10 rounded-xl hover:bg-gray-100 transition flex items-center justify-center"
            title="Help"
          >

            <CircleHelp
              size={20}
              className="text-gray-600"
            />

          </button>

          {/* Notifications */}

          <button
            className="relative h-10 w-10 rounded-xl hover:bg-gray-100 transition flex items-center justify-center"
            title="Notifications"
          >

            <Bell
              size={20}
              className="text-gray-600"
            />

            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>

          </button>

          {/* Settings */}

          <button
            className="h-10 w-10 rounded-xl hover:bg-gray-100 transition flex items-center justify-center"
            title="Settings"
          >

            <Settings
              size={20}
              className="text-gray-600"
            />

          </button>

          {/* User */}

          <button
            className="ml-2 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 hover:shadow-md transition"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">

              {user.initials}

            </div>

            <div className="hidden xl:block text-left">

              <p className="text-sm font-semibold text-gray-800">

                {user.name}

              </p>

              <p className="text-xs text-gray-500">

                Connected

              </p>

            </div>

            <ChevronDown
              size={18}
              className="text-gray-500"
            />

          </button>

        </div>

      </div>

    </header>
  );
}