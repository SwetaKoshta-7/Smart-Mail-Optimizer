import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

import EmailCard from "./EmailCard";
import SearchBar from "./SearchBar";
import EmailDetails from "./EmailDetails";

import {
  RefreshCcw,
  Filter,
  Mail,
  LoaderCircle,
} from "lucide-react";

export default function EmailList() {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEmails = async () => {
    try {
      setLoading(true);

      const response = await api.get("/emails");

      const data = response.data.emails || [];

      setEmails(data);
      setFilteredEmails(data);

      if (data.length > 0) {
        setSelectedEmail(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredEmails(emails);
      return;
    }

    const q = query.toLowerCase();

    const results = emails.filter((email) => {
      return (
        email.sender?.toLowerCase().includes(q) ||
        email.subject?.toLowerCase().includes(q) ||
        email.snippet?.toLowerCase().includes(q)
      );
    });

    setFilteredEmails(results);
  };

  const totalUnread = useMemo(() => {
    return emails.filter((mail) => !mail.is_read).length;
  }, [emails]);

  return (
    <div className="h-full flex flex-col">

      {/* Search */}

      <SearchBar onSearch={handleSearch} />

      {/* Toolbar */}

      <div className="flex justify-between items-center bg-white rounded-xl border px-5 py-3 mb-5">

        <div className="flex items-center gap-4">

          <button
            onClick={fetchEmails}
            className="hover:bg-gray-100 rounded-lg p-2 transition"
          >
            <RefreshCcw size={20} />
          </button>

          <button
            className="hover:bg-gray-100 rounded-lg p-2 transition"
          >
            <Filter size={20} />
          </button>

        </div>

        <div className="text-sm text-gray-600">

          {filteredEmails.length} emails

          <span className="mx-2">•</span>

          {totalUnread} unread

        </div>

      </div>

      {/* Main Layout */}

      <div className="flex gap-6 flex-1 overflow-hidden">

        {/* Email List */}

        <div className="w-[42%] overflow-y-auto">

          {loading ? (

            <div className="flex justify-center items-center h-72">

              <LoaderCircle
                className="animate-spin text-blue-600"
                size={35}
              />

            </div>

          ) : filteredEmails.length === 0 ? (

            <div className="bg-white rounded-xl border h-60 flex flex-col justify-center items-center">

              <Mail
                size={45}
                className="text-gray-400 mb-4"
              />

              <p className="text-gray-500">
                No emails found
              </p>

            </div>

          ) : (

            filteredEmails.map((email) => (

              <EmailCard
                key={email._id}
                email={email}
                selected={selectedEmail?._id === email._id}
                onClick={() => setSelectedEmail(email)}
              />

            ))

          )}

        </div>

        {/* Email Details */}

        <div className="flex-1 bg-white rounded-xl border overflow-hidden">

          {selectedEmail ? (

            <EmailDetails
              email={selectedEmail}
            />

          ) : (

            <div className="flex h-full justify-center items-center text-gray-500">

              Select an email

            </div>

          )}

        </div>

      </div>

    </div>
  );
}