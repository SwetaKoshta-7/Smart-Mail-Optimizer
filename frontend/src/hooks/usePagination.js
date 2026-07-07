import { useState, useMemo, useCallback } from "react";

export function usePagination({ initialPage = 1, limit = 20, total = 0 } = {}) {
  const [page, setPage] = useState(initialPage);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(total / limit));
  }, [total, limit]);

  const nextPage = useCallback(() => {
    setPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((p) => Math.max(p - 1, 1));
  }, []);

  const goToPage = useCallback((p) => {
    setPage(Math.min(Math.max(p, 1), totalPages));
  }, [totalPages]);

  return {
    page,
    setPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export default usePagination;