import {
  RefreshCcw,
  Archive,
  Trash2,
  Star,
  MailOpen,
  Filter,
  ArrowUpDown,
  Sparkles,
  CheckSquare,
} from "lucide-react";

export default function EmailToolbar({
  totalEmails = 0,
  unreadCount = 0,
  onRefresh,
  onArchive,
  onDelete,
  onMarkRead,
  onStar,
  onSelectAll,
  onSmartFilter,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-3 mb-5 flex items-center justify-between">

      {/* Left Section */}

      <div className="flex items-center gap-2">

        <button
          onClick={onSelectAll}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Select All"
        >
          <CheckSquare size={20} />
        </button>

        <button
          onClick={onRefresh}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Refresh"
        >
          <RefreshCcw size={20} />
        </button>

        <button
          onClick={onArchive}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Archive"
        >
          <Archive size={20} />
        </button>

        <button
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Delete"
        >
          <Trash2 size={20} />
        </button>

        <button
          onClick={onMarkRead}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Mark as Read"
        >
          <MailOpen size={20} />
        </button>

        <button
          onClick={onStar}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Star"
        >
          <Star size={20} />
        </button>

      </div>

      {/* Center */}

      <div className="hidden lg:flex items-center gap-6 text-sm text-gray-600">

        <span>
          <strong>{totalEmails}</strong> Emails
        </span>

        <span>
          <strong>{unreadCount}</strong> Unread
        </span>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <button
          onClick={onSmartFilter}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition"
        >
          <Sparkles size={18} />
          AI Filter
        </button>

        <button
          className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50 transition"
        >
          <Filter size={18} />
          Filter
        </button>

        <button
          className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50 transition"
        >
          <ArrowUpDown size={18} />
          Sort
        </button>

      </div>

    </div>
  );
}