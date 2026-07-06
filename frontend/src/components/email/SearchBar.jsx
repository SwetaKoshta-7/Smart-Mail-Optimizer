import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">

        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search mail by sender, subject or content..."
          className="w-full bg-white border border-gray-200 rounded-xl h-12 pl-14 pr-12 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {query.length > 0 && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <button className="bg-white border border-gray-200 h-12 px-5 rounded-xl shadow-sm hover:bg-gray-50 transition flex items-center gap-2">
        <SlidersHorizontal size={18} />
        Filters
      </button>
    </div>
  );
}