import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-3">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="p-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100 transition"
      >
        <ChevronLeft size={18} />
      </button>

      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="p-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100 transition"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}