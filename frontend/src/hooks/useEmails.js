import { useEffect } from "react";
import { useEmailContext } from "../context/EmailContext";

export function useEmails() {
  const {
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
  } = useEmailContext();

  useEffect(() => {
    fetchEmails();
  }, [page, label]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
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
    refresh: fetchEmails,
    openEmail,
    toggleStar,
    archiveEmail,
    trashEmail,
    syncEmails,
  };
}

export default useEmails;