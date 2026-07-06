// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="h-screen bg-gray-100 flex overflow-hidden">

//       {/* Sidebar */}

//       <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 shadow-sm">
//         <Sidebar />
//       </aside>

//       {/* Main Content */}

//       <div className="flex-1 flex flex-col overflow-hidden">

//         {/* Header */}

//         <Header />

//         {/* Dashboard Content */}

//         <main className="flex-1 overflow-hidden">
//           <div className="h-full p-6 overflow-y-auto">

//             {children}

//           </div>
//         </main>

//       </div>

//     </div>
//   );
// }



import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
  activeMenu,
  onMenuChange,
}) {
  return (
    <div className="h-screen bg-slate-100 flex overflow-hidden">

      {/* Sidebar */}

      <aside className="hidden lg:flex lg:w-72 xl:w-80 bg-white border-r border-gray-200 shadow-sm flex-col">

        <Sidebar
          activeMenu={activeMenu}
          onMenuChange={onMenuChange}
        />

      </aside>

      {/* Main Content */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}

        <Header />

        {/* Page Content */}

        <main className="flex-1 overflow-hidden bg-slate-50">

          <div className="h-full overflow-y-auto p-6">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}