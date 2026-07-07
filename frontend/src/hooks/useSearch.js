import { useState, useCallback, useRef } from "react";
import emailService from "../services/emailService";

export function useSearch({ debounceMs = 400 } = {}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  const runSearch = useCallback(async (q) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await emailService.searchEmails(q);
      setResults(data.emails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(
    (q) => {
      setQuery(q);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        runSearch(q);
      }, debounceMs);
    },
    [runSearch, debounceMs]
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return {
    query,
    results,
    loading,
    error,
    search,
    clearSearch,
  };
}

export default useSearch;