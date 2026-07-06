import { useState } from "react";
import { X, Send, LoaderCircle } from "lucide-react";
import emailService from "../../services/emailService";

function extractEmail(senderString = "") {
  const match = senderString.match(/<(.+)>/);
  return match ? match[1] : senderString;
}

export default function ComposeModal({ mode = "compose", sourceEmail, onClose }) {
  const isReply = mode === "reply";
  const isForward = mode === "forward";

  const [to, setTo] = useState(isReply ? extractEmail(sourceEmail?.sender) : "");
  const [subject, setSubject] = useState(
    isReply
      ? `Re: ${sourceEmail?.subject || ""}`
      : isForward
      ? `Fwd: ${sourceEmail?.subject || ""}`
      : ""
  );
  const [body, setBody] = useState(
    isForward
      ? `\n\n---------- Forwarded message ----------\nFrom: ${sourceEmail?.sender}\nSubject: ${sourceEmail?.subject}\n\n${sourceEmail?.body || sourceEmail?.snippet || ""}`
      : ""
  );

  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  async function handleSend() {
    if (!to.trim() || !subject.trim()) {
      setError("Recipient and subject are required.");
      return;
    }

    setSending(true);
    setError(null);

    try {
      await emailService.sendEmail({
        to,
        subject,
        body,
        threadId: isReply ? sourceEmail?.thread_id : undefined,
        inReplyTo: isReply ? sourceEmail?.gmail_id : undefined,
      });
      setSent(true);
      setTimeout(onClose, 1000);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to send email.");
    } finally {
      setSending(false);
    }
  }

  const title = isReply ? "Reply" : isForward ? "Forward" : "New Message";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-end p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b bg-slate-50">
          <h2 className="font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-200">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-3">
          <input
            type="email"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
          />

          <textarea
            placeholder="Write your message..."
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 resize-none"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
          {sent && <p className="text-sm text-green-600">Sent!</p>}
        </div>

        <div className="px-5 py-4 border-t flex justify-end">
          <button
            onClick={handleSend}
            disabled={sending || sent}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition disabled:opacity-60"
          >
            {sending ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}