import {
  Inbox,
  CircleAlert,
  MailOpen,
  Send,
  ShieldAlert,
  Trash2,
  BarChart3,
  Settings,
  PenSquare,
} from "lucide-react";

const menu = [
  {
    name: "Inbox",
    icon: Inbox,
    active: true,
  },
  {
    name: "Important",
    icon: CircleAlert,
  },
  {
    name: "Unread",
    icon: MailOpen,
  },
  {
    name: "Sent",
    icon: Send,
  },
  {
    name: "Spam",
    icon: ShieldAlert,
  },
  {
    name: "Trash",
    icon: Trash2,
  },
  {
    name: "Analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b">

        <h1 className="text-2xl font-bold text-blue-600">
          Smart Mail
        </h1>

        <p className="text-sm text-gray-500">
          Optimizer
        </p>

      </div>

      {/* Compose */}

      <div className="p-5">

        <button className="w-full bg-blue-600 text-white rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition">

          <PenSquare size={20} />

          Compose

        </button>

      </div>

      {/* Menu */}

      <nav className="flex-1 px-3">

        <div className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  item.active
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />

                {item.name}
              </button>
            );
          })}

        </div>

      </nav>

      <div className="p-5 border-t">

        <p className="text-sm text-gray-500">
          Smart Mail Optimizer
        </p>

        <p className="text-xs text-gray-400">
          AI Powered Email Manager
        </p>

      </div>

    </div>
  );
}