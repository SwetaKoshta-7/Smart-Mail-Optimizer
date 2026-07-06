import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">

      {/* Sidebar */}

      <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 shadow-sm">
        <Sidebar />
      </aside>

      {/* Main Content */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}

        <Header />

        {/* Dashboard Content */}

        <main className="flex-1 overflow-hidden">
          <div className="h-full p-6 overflow-y-auto">

            {children}

          </div>
        </main>

      </div>

    </div>
  );
}