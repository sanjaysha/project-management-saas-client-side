import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
          bg-white border-r border-gray-200 transition-all duration-300 
          ${isSidebarOpen ? "w-60" : "w-16"}
        `}
      >
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && (
            <h1 className="text-xl font-semibold text-gray-900">Workspace</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isSidebarOpen ? "←" : "→"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-1 px-3">
          <Link
            to="/"
            className="
              block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 
              hover:bg-gray-100 hover:text-gray-900
            "
          >
            Workspaces
          </Link>

          <Link
            to="/projects"
            className="
              block px-3 py-2 rounded-lg text-sm font-medium text-gray-700
              hover:bg-gray-100 hover:text-gray-900
            "
          >
            Projects
          </Link>

          <Link
            to="/board"
            className="
              block px-3 py-2 rounded-lg text-sm font-medium text-gray-700
              hover:bg-gray-100 hover:text-gray-900
            "
          >
            Board
          </Link>

          <Link
            to="/activities"
            className="
              block px-3 py-2 rounded-lg text-sm font-medium text-gray-700
              hover:bg-gray-100 hover:text-gray-900
            "
          >
            Activity Log
          </Link>
        </nav>

        {/* Footer / Logout */}
        <div className="absolute bottom-4 w-full px-3">
          {isSidebarOpen && (
            <div className="pb-3">
              <p className="text-sm text-gray-500">Signed in as:</p>
              <p className="text-sm font-medium">{user?.email}</p>
            </div>
          )}

          <button
            className="
              w-full text-left px-3 py-2 rounded-lg text-sm font-medium 
              text-red-600 hover:bg-red-50
            "
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="h-14 border-b px-6 flex items-center bg-white sticky top-0">
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
