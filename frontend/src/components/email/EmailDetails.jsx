import {
  Reply,
  Forward,
  Trash2,
  Archive,
  Star,
  Paperclip,
  Sparkles,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function EmailDetails({ email }) {
  if (!email) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select an email
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      {/* Header */}

      <div className="border-b px-8 py-6">

        <div className="flex justify-between items-start">

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              {email.subject}
            </h1>

            <div className="flex items-center gap-3 mt-3">

              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
                {email.sender?.charAt(0)?.toUpperCase()}
              </div>

              <div>

                <h2 className="font-semibold">
                  {email.sender}
                </h2>

                <p className="text-sm text-gray-500">
                  {email.sender_email || "unknown@email.com"}
                </p>

              </div>

            </div>

          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500">
              {email.date}
            </p>

            <div className="flex gap-2 mt-4">

              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Reply size={18} />
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Forward size={18} />
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Archive size={18} />
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Trash2 size={18} />
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Star size={18} />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* AI Summary */}

      {email.ai_summary && (
        <div className="mx-8 mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-5">

          <div className="flex items-center gap-2 mb-3">

            <Sparkles
              className="text-purple-600"
              size={20}
            />

            <h2 className="font-semibold text-purple-700">
              AI Summary
            </h2>

          </div>

          <p className="text-gray-700">
            {email.ai_summary}
          </p>

        </div>
      )}

      {/* Labels */}

      <div className="flex gap-3 px-8 mt-6 flex-wrap">

        {email.priority && (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium

            ${
              email.priority === "High"
                ? "bg-red-100 text-red-700"
                : email.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {email.priority} Priority
          </span>
        )}

        {email.category && (
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
            {email.category}
          </span>
        )}

        {email.is_spam === false && (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            <ShieldCheck size={15} />
            Safe
          </span>
        )}

        {email.has_attachment && (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
            <Paperclip size={15} />
            Attachment
          </span>
        )}

      </div>

      {/* Body */}

      <div className="flex-1 overflow-y-auto px-8 py-8">

        <div className="prose max-w-none">

          <p className="leading-8 whitespace-pre-wrap text-gray-700">

            {email.body || email.snippet}

          </p>

        </div>

        {/* Attachments */}

        {email.attachments?.length > 0 && (

          <div className="mt-10">

            <h3 className="font-semibold mb-4">
              Attachments
            </h3>

            <div className="grid grid-cols-2 gap-4">

              {email.attachments.map((file, index) => (

                <div
                  key={index}
                  className="border rounded-xl p-4 flex items-center justify-between hover:bg-gray-50"
                >

                  <div className="flex items-center gap-3">

                    <Paperclip />

                    <div>

                      <p className="font-medium">
                        {file.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {file.size}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

      {/* Footer */}

      <div className="border-t px-8 py-5 flex justify-between items-center">

        <div className="text-sm text-gray-500 flex items-center gap-2">

          <Clock size={16} />

          Received {email.date}

        </div>

        <div className="flex gap-3">

          <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Reply
          </button>

          <button className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition">
            Forward
          </button>

        </div>

      </div>

    </div>
  );
}