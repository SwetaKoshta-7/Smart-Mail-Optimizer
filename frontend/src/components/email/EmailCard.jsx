import {
  Star,
  Archive,
  Trash2,
  MoreHorizontal,
  Sparkles,
  Paperclip,
} from "lucide-react";

export default function EmailCard({
  email,
  selected,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-xl border transition-all duration-200 mb-3

      ${
        selected
          ? "bg-blue-50 border-blue-500 shadow-md"
          : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-center px-6 py-5">

        {/* Avatar */}

        <div className="mr-5">

          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">
            {email.sender?.charAt(0)?.toUpperCase() || "?"}
          </div>

        </div>

        {/* Email Body */}

        <div className="flex-1 min-w-0">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <h2
                className={`truncate text-[15px]

                ${
                  email.is_read
                    ? "font-medium text-gray-700"
                    : "font-bold text-gray-900"
                }`}
              >
                {email.sender}
              </h2>

              {email.priority && (
                <span
                  className={`text-xs px-2 py-1 rounded-full

                  ${
                    email.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : email.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {email.priority}
                </span>
              )}

              {email.ai_summary && (
                <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  <Sparkles size={13} />
                  AI Summary
                </span>
              )}

            </div>

            <span className="text-xs text-gray-500 whitespace-nowrap">
              {email.date}
            </span>

          </div>

          <div className="mt-2">

            <h3
              className={`truncate

              ${
                email.is_read
                  ? "font-medium text-gray-800"
                  : "font-semibold text-black"
              }`}
            >
              {email.subject}
            </h3>

          </div>

          <div className="flex justify-between items-center mt-2">

            <p className="text-sm text-gray-500 truncate max-w-[80%]">
              {email.snippet}
            </p>

            {email.has_attachment && (
              <Paperclip
                size={16}
                className="text-gray-400"
              />
            )}

          </div>

        </div>

        {/* Hover Actions */}

        <div className="hidden group-hover:flex items-center gap-3 ml-5">

          <button className="hover:bg-gray-100 p-2 rounded-full">
            <Star size={18} />
          </button>

          <button className="hover:bg-gray-100 p-2 rounded-full">
            <Archive size={18} />
          </button>

          <button className="hover:bg-gray-100 p-2 rounded-full">
            <Trash2 size={18} />
          </button>

          <button className="hover:bg-gray-100 p-2 rounded-full">
            <MoreHorizontal size={18} />
          </button>

        </div>

      </div>
    </div>
  );
}