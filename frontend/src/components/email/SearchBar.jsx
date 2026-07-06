// import { Search, SlidersHorizontal, X } from "lucide-react";
// import { useState } from "react";

// export default function SearchBar({ onSearch }) {
//   const [query, setQuery] = useState("");

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (onSearch) {
//       onSearch(value);
//     }
//   };

//   const clearSearch = () => {
//     setQuery("");
//     if (onSearch) {
//       onSearch("");
//     }
//   };

//   return (
//     <div className="flex items-center gap-4 mb-6">
//       <div className="relative flex-1">

//         <Search
//           size={20}
//           className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
//         />

//         <input
//           type="text"
//           value={query}
//           onChange={handleChange}
//           placeholder="Search mail by sender, subject or content..."
//           className="w-full bg-white border border-gray-200 rounded-xl h-12 pl-14 pr-12 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />

//         {query.length > 0 && (
//           <button
//             onClick={clearSearch}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
//           >
//             <X size={18} />
//           </button>
//         )}
//       </div>

//       <button className="bg-white border border-gray-200 h-12 px-5 rounded-xl shadow-sm hover:bg-gray-50 transition flex items-center gap-2">
//         <SlidersHorizontal size={18} />
//         Filters
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Command,
  Filter,
} from "lucide-react";

const filters = [
  "All",
  "Unread",
  "Important",
  "Attachments",
];

export default function SearchBar({
  onSearch,
  onFilterChange,
}) {

  const [query, setQuery] = useState("");

  const [activeFilter, setActiveFilter] = useState("All");

  //----------------------------------------------------
  // Debounce Search
  //----------------------------------------------------

  useEffect(() => {

    const timer = setTimeout(() => {

      onSearch?.(query);

    }, 300);

    return () => clearTimeout(timer);

  }, [query]);

  //----------------------------------------------------

  const clearSearch = () => {

    setQuery("");

    onSearch?.("");

  };

  //----------------------------------------------------

  const handleFilter = (filter) => {

    setActiveFilter(filter);

    onFilterChange?.(filter);

  };

  //----------------------------------------------------

  return (

    <div className="space-y-4 mb-6">

      {/* Search */}

      <div className="flex items-center gap-4">

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={query}
            placeholder="Search sender, subject, content..."
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full
              h-12
              rounded-2xl
              border
              border-gray-200
              bg-white
              pl-14
              pr-24
              shadow-sm
              outline-none
              transition
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
            "
          />

          {/* Clear */}

          {query && (

            <button
              onClick={clearSearch}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >

              <X size={18} />

            </button>

          )}

          {/* Shortcut */}

          <div className="absolute right-4 top-1/2 -translate-y-1/2">

            <div className="flex items-center gap-1 rounded-lg border bg-gray-50 px-2 py-1 text-xs text-gray-500">

              <Command size={12} />

              K

            </div>

          </div>

        </div>

        {/* Advanced Filters */}

        <button
          className="
            h-12
            px-5
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-sm
            hover:bg-gray-50
            transition
            flex
            items-center
            gap-2
          "
        >

          <SlidersHorizontal size={18} />

          Filters

        </button>

      </div>

      {/* Quick Filters */}

      <div className="flex items-center gap-3 flex-wrap">

        {filters.map((filter) => (

          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={`
              px-4
              py-2
              rounded-full
              text-sm
              transition

              ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border hover:bg-blue-50"
              }
            `}
          >

            {filter}

          </button>

        ))}

        <button
          className="ml-2 text-sm text-blue-600 flex items-center gap-2 hover:text-blue-700"
        >

          <Filter size={16} />

          Advanced Search

        </button>

      </div>

    </div>

  );

}