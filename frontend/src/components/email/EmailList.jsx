// import { useEffect, useState } from "react";

// import EmailCard from "./EmailCard";
// import SearchBar from "./SearchBar";
// import EmailDetails from "./EmailDetails";
// import ComposeModal from "./ComposeModal";

// import { useEmailContext } from "../../context/EmailContext";
// import { useSearch } from "../../hooks/useSearch";
// import { usePagination } from "../../hooks/usePagination";

// import {
//   RefreshCcw,
//   Filter,
//   Mail,
//   LoaderCircle,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// export default function EmailList({ activeMenu }) {
//   const {
//     emails,
//     selectedEmail,
//     setSelectedEmail,
//     label,
//     setLabel,
//     page,
//     setPage,
//     total,
//     loading,
//     fetchEmails,
//     openEmail,
//     toggleStar,
//     archiveEmail,
//     trashEmail,
//     syncEmails,
//   } = useEmailContext();

//   const { query, results, loading: searching, search, clearSearch } = useSearch();
//   const { totalPages, nextPage, prevPage, hasNext, hasPrev } = usePagination({
//     total,
//     limit: 20,
//   });

//   const [composeMode, setComposeMode] = useState(null); // null | { mode, email }

//   // Sync sidebar selection -> shared email context label
//   useEffect(() => {
//     if (activeMenu && activeMenu !== label) {
//       setLabel(activeMenu);
//       setPage(1);
//       clearSearch();
//     }
//   }, [activeMenu]); // eslint-disable-line react-hooks/exhaustive-deps

//   const isSearching = query.trim().length > 0;
//   const displayList = isSearching ? results : emails;
//   const isLoading = isSearching ? searching : loading;

//   async function handleSelect(email) {
//     setSelectedEmail(email);
//     // fetch full details + mark read
//     await openEmail(email.gmail_id);
//   }

//   async function handleStar(email, e) {
//     e.stopPropagation();
//     await toggleStar(email.gmail_id, !email.is_starred);
//   }

//   async function handleArchive(email, e) {
//     e.stopPropagation();
//     await archiveEmail(email.gmail_id);
//     if (selectedEmail?.gmail_id === email.gmail_id) setSelectedEmail(null);
//   }

//   async function handleTrash(email, e) {
//     e.stopPropagation();
//     await trashEmail(email.gmail_id);
//     if (selectedEmail?.gmail_id === email.gmail_id) setSelectedEmail(null);
//   }

//   return (
//     <div className="h-full flex flex-col">
//       <SearchBar onSearch={search} />

//       {/* Toolbar */}
//       <div className="flex justify-between items-center bg-white rounded-xl border px-5 py-3 mb-5">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={syncEmails}
//             className="hover:bg-gray-100 rounded-lg p-2 transition"
//             title="Sync with Gmail"
//           >
//             <RefreshCcw size={20} />
//           </button>

//           <button className="hover:bg-gray-100 rounded-lg p-2 transition">
//             <Filter size={20} />
//           </button>
//         </div>

//         <div className="text-sm text-gray-600">
//           {displayList.length} emails
//           {!isSearching && (
//             <>
//               <span className="mx-2">•</span>
//               page {page} of {totalPages}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className="flex gap-6 flex-1 overflow-hidden">
//         <div className="w-[42%] flex flex-col overflow-hidden">
//           <div className="flex-1 overflow-y-auto">
//             {isLoading ? (
//               <div className="flex justify-center items-center h-72">
//                 <LoaderCircle className="animate-spin text-blue-600" size={35} />
//               </div>
//             ) : displayList.length === 0 ? (
//               <div className="bg-white rounded-xl border h-60 flex flex-col justify-center items-center">
//                 <Mail size={45} className="text-gray-400 mb-4" />
//                 <p className="text-gray-500">No emails found</p>
//               </div>
//             ) : (
//               displayList.map((email) => (
//                 <EmailCard
//                   key={email.gmail_id}
//                   email={email}
//                   selected={selectedEmail?.gmail_id === email.gmail_id}
//                   onClick={() => handleSelect(email)}
//                   onStar={(e) => handleStar(email, e)}
//                   onArchive={(e) => handleArchive(email, e)}
//                   onTrash={(e) => handleTrash(email, e)}
//                 />
//               ))
//             )}
//           </div>

//           {/* Pagination */}
//           {!isSearching && totalPages > 1 && (
//             <div className="flex items-center justify-between px-2 py-3">
//               <button
//                 onClick={() => {
//                   prevPage();
//                   setPage((p) => Math.max(1, p - 1));
//                 }}
//                 disabled={!hasPrev}
//                 className="p-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100"
//               >
//                 <ChevronLeft size={18} />
//               </button>

//               <span className="text-sm text-gray-600">
//                 {page} / {totalPages}
//               </span>

//               <button
//                 onClick={() => {
//                   nextPage();
//                   setPage((p) => Math.min(totalPages, p + 1));
//                 }}
//                 disabled={!hasNext}
//                 className="p-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100"
//               >
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Email Details */}
//         <div className="flex-1 bg-white rounded-xl border overflow-hidden">
//           {selectedEmail ? (
//             <EmailDetails
//               email={selectedEmail}
//               onReply={() => setComposeMode({ mode: "reply", email: selectedEmail })}
//               onForward={() => setComposeMode({ mode: "forward", email: selectedEmail })}
//             />
//           ) : (
//             <div className="flex h-full justify-center items-center text-gray-500">
//               Select an email
//             </div>
//           )}
//         </div>
//       </div>

//       {composeMode && (
//         <ComposeModal
//           mode={composeMode.mode}
//           sourceEmail={composeMode.email}
//           onClose={() => setComposeMode(null)}
//         />
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";

import EmailCard from "./EmailCard";
import SearchBar from "./SearchBar";
import EmailDetails from "./EmailDetails";
import ComposeModal from "./ComposeModal";
import Pagination from "./Pagination";

import { useEmailContext } from "../../context/EmailContext";
import emailService from "../../services/emailService";

import { RefreshCcw, Filter, Mail, LoaderCircle } from "lucide-react";

const filterToLabel = {
  All: null, // falls back to activeMenu/sidebar label
  Unread: "UNREAD",
  Important: "IMPORTANT",
};

export default function EmailList({ activeMenu }) {
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
    openEmail,
    toggleStar,
    archiveEmail,
    trashEmail,
    syncEmails,
  } = useEmailContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [composeMode, setComposeMode] = useState(null);

  const totalPages = Math.max(1, Math.ceil(total / 20));

  // Sidebar menu -> shared label, unless a quick filter overrides it
  useEffect(() => {
    if (activeMenu && activeMenu !== label) {
      setLabel(activeMenu);
      setPage(1);
      setSearchQuery("");
    }
  }, [activeMenu]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSearch(query) {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const data = await emailService.searchEmails(query);
      setSearchResults(data.emails);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  }

  function handleFilterChange(filter) {
    if (filter === "Attachments") return; // no backend support yet
    const mapped = filterToLabel[filter];
    setLabel(mapped || activeMenu || "INBOX");
    setPage(1);
  }

  const isSearching = searchQuery.trim().length > 0;
  const displayList = isSearching ? searchResults : emails;
  const isLoading = isSearching ? searching : loading;

  async function handleSelect(email) {
    setSelectedEmail(email);
    await openEmail(email.gmail_id);
  }

  async function handleStar(email, e) {
    e.stopPropagation();
    await toggleStar(email.gmail_id, !email.is_starred);
  }

  async function handleArchive(email, e) {
    e.stopPropagation();
    await archiveEmail(email.gmail_id);
    if (selectedEmail?.gmail_id === email.gmail_id) setSelectedEmail(null);
  }

  async function handleTrash(email, e) {
    e.stopPropagation();
    await trashEmail(email.gmail_id);
    if (selectedEmail?.gmail_id === email.gmail_id) setSelectedEmail(null);
  }

  return (
    <div className="h-full flex flex-col">
      <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />

      <div className="flex justify-between items-center bg-white rounded-xl border px-5 py-3 mb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={syncEmails}
            className="hover:bg-gray-100 rounded-lg p-2 transition"
            title="Sync with Gmail"
          >
            <RefreshCcw size={20} />
          </button>

          <button className="hover:bg-gray-100 rounded-lg p-2 transition">
            <Filter size={20} />
          </button>
        </div>

        <div className="text-sm text-gray-600">
          {displayList.length} emails
          {!isSearching && (
            <>
              <span className="mx-2">•</span>
              page {page} of {totalPages}
            </>
          )}
        </div>
      </div>

      <div className="flex gap-6 flex-1 overflow-hidden">
        <div className="w-[42%] flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-72">
                <LoaderCircle className="animate-spin text-blue-600" size={35} />
              </div>
            ) : displayList.length === 0 ? (
              <div className="bg-white rounded-xl border h-60 flex flex-col justify-center items-center">
                <Mail size={45} className="text-gray-400 mb-4" />
                <p className="text-gray-500">No emails found</p>
              </div>
            ) : (
              displayList.map((email) => (
                <EmailCard
                  key={email.gmail_id}
                  email={email}
                  selected={selectedEmail?.gmail_id === email.gmail_id}
                  onClick={() => handleSelect(email)}
                  onStar={(e) => handleStar(email, e)}
                  onArchive={(e) => handleArchive(email, e)}
                  onTrash={(e) => handleTrash(email, e)}
                />
              ))
            )}
          </div>

          {!isSearching && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          )}
        </div>

        <div className="flex-1 bg-white rounded-xl border overflow-hidden">
          {selectedEmail ? (
            <EmailDetails
              email={selectedEmail}
              onReply={() => setComposeMode({ mode: "reply", email: selectedEmail })}
              onForward={() => setComposeMode({ mode: "forward", email: selectedEmail })}
            />
          ) : (
            <div className="flex h-full justify-center items-center text-gray-500">
              Select an email
            </div>
          )}
        </div>
      </div>

      {composeMode && (
        <ComposeModal
          mode={composeMode.mode}
          sourceEmail={composeMode.email}
          onClose={() => setComposeMode(null)}
        />
      )}
    </div>
  );
}