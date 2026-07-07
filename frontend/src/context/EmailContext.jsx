import { createContext, useContext, useState, useCallback } from "react";
import emailService from "../services/emailService";

const EmailContext = createContext(null);

export function EmailProvider({ children }) {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [label, setLabel] = useState("INBOX");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmails = useCallback(async (opts = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit: 20, label, ...opts };
      const data = await emailService.getEmails(params);
      setEmails(data.emails);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, label]);

  const openEmail = useCallback(async (gmailId) => {
    const data = await emailService.getEmail(gmailId);
    setSelectedEmail(data);

    if (!data.is_read) {
      await emailService.markRead(gmailId);
      setEmails((prev) =>
        prev.map((e) => (e.gmail_id === gmailId ? { ...e, is_read: true } : e))
      );
    }

    return data;
  }, []);

  const toggleStar = useCallback(async (gmailId, starred) => {
    await emailService.toggleStar(gmailId, starred);
    setEmails((prev) =>
      prev.map((e) => (e.gmail_id === gmailId ? { ...e, is_starred: starred } : e))
    );
  }, []);

  const archiveEmail = useCallback(async (gmailId) => {
    await emailService.archiveEmail(gmailId);
    setEmails((prev) => prev.filter((e) => e.gmail_id !== gmailId));
  }, []);

  const trashEmail = useCallback(async (gmailId) => {
    await emailService.trashEmail(gmailId);
    setEmails((prev) => prev.filter((e) => e.gmail_id !== gmailId));
  }, []);

  const syncEmails = useCallback(async () => {
    setLoading(true);
    try {
      await emailService.syncEmails();
      await fetchEmails();
    } finally {
      setLoading(false);
    }
  }, [fetchEmails]);

  return (
    <EmailContext.Provider
      value={{
        emails,
        selectedEmail,
        setSelectedEmail,
        label,
        setLabel,
        page,
        setPage,
        total,
        loading,
        error,
        fetchEmails,
        openEmail,
        toggleStar,
        archiveEmail,
        trashEmail,
        syncEmails,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}

export function useEmailContext() {
  const ctx = useContext(EmailContext);
  if (!ctx) throw new Error("useEmailContext must be used within EmailProvider");
  return ctx;
}