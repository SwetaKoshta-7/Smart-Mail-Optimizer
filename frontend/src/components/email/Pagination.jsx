import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const start = (currentPage - 1) * itemsPerPage + 1;

  const end = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-4 mt-5 flex flex-col md:flex-row items-center justify-between gap-4">

      {/* Left */}

      <div className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-semibold">
          {start}
        </span>{" "}
        -
        <span className="font-semibold">
          {" "}
          {end}
        </span>{" "}
        of{" "}
        <span className="font-semibold">
          {totalItems}
        </span>{" "}
        emails
      </div>

      {/* Center */}

      <div className="flex items-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className={`p-2 rounded-lg transition

          ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        {Array.from(
          { length: totalPages },
          (_, i) => (
            <button
              key={i}
              onClick={() =>
                onPageChange(i + 1)
              }
              className={`w-10 h-10 rounded-lg transition

              ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className={`p-2 rounded-lg transition

          ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <ChevronRight size={20} />
        </button>

      </div>

      {/* Right */}

      <div className="flex items-center gap-2">

        <span className="text-sm text-gray-600">
          Rows:
        </span>

        <select
          value={itemsPerPage}
          disabled
          className="border rounded-lg px-3 py-2 bg-gray-50 text-sm"
        >
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>

      </div>

    </div>
  );
}