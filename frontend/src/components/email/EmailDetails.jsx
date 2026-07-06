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

      <div className="sticky top-0 bg-white border-b px-8 py-6 z-10">

        <div className="flex justify-between items-start">

          <div className="flex gap-4">

            <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">

              {email.sender?.charAt(0)?.toUpperCase()}

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-900">

                {email.subject}

              </h1>

              <p className="text-gray-600 mt-2">

                {email.sender}

              </p>

              <p className="text-sm text-gray-500">

                {email.sender_email || "unknown@email.com"}

              </p>

            </div>

          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500">

              {email.date}

            </p>

          </div>

        </div>

      </div>

      {/* AI Summary */}

      <div className="mx-8 mt-6 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-6">

        <div className="flex items-center gap-3 mb-3">

          <Sparkles className="text-purple-600" />

          <h2 className="font-semibold text-purple-700">

            AI Summary

          </h2>

        </div>

        <p className="leading-7 text-gray-700">

          {email.ai_summary}

        </p>

      </div>

      {/* Labels */}

      <div className="flex gap-2 flex-wrap px-8 mt-6">

        {email.labels?.map((label) => (

          <span
            key={label}
            className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm"
          >

            {label}

          </span>

        ))}

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

      {/* Attatchments 
      
      <div className="grid grid-cols-2 gap-4 mt-6">

        {email.attachments.map((file) => (

          <button
            key={file.name}
            className="rounded-xl border hover:border-blue-400 hover:shadow-md p-4 flex items-center justify-between transition"
          >

            <div className="flex items-center gap-3">

              <Paperclip />

              <div>

                <p className="font-semibold">

                  {file.name}

                </p>

                <p className="text-sm text-gray-500">

                  {file.size}

                </p>

              </div>

            </div>

          </button>

        ))}

      </div>

      */}

      {/* Footer */}

      <div className="border-t px-8 py-5 flex justify-between items-center bg-white">

        <p className="text-sm text-gray-500">

          Received on {email.date}

        </p>

        <div className="flex gap-3">

          <button className="rounded-xl bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition">

            Reply

          </button>

          <button className="rounded-xl border px-6 py-2 hover:bg-gray-100 transition">

            Forward

          </button>

        </div>

      </div>

    </div>
  );
}