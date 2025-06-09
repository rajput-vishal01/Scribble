import React from "react";
import { Link } from "react-router";
import { Plus, PenTool, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const { authUser, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Desktop & Tablet Header */}
      <header className="hidden m-4 rounded sm:block bg-surface shadow-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="flex items-center space-x-3 text-2xl tracking-wide text-primary">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-surface rounded-xl shadow-md border border-stone-200">
                <PenTool className="w-5 h-5 text-amber-600" />
              </div>
              <span className="font-sans font-thin text-primary">SCRIBBLE</span>
            </h1>

            <div className="flex items-center gap-2">
              <Link
                to="/create"
                className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full hover:from-amber-700 hover:to-orange-700 focus-ring transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                aria-label="Create Post">
                <Plus size={20} />
              </Link>

              {authUser && (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
                  aria-label="Logout"
                  title="Logout">
                  <LogOut size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="sm:hidden m-4 rounded bg-surface shadow-md border-b border-stone-200 sticky top-0 z-50">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="flex items-center space-x-3 text-xl font-extrabold tracking-wide text-primary">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-surface rounded-lg shadow-md border border-stone-200">
                <PenTool className="w-4 h-4 text-amber-600" />
              </div>
              <span className="font-sans font-thin text-primary">SCRIBBLE</span>
            </h1>

            {authUser && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
                aria-label="Logout">
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden m-4 rounded fixed bottom-0 left-0 right-0 bg-surface border-t border-stone-200 shadow-lg z-50">
        <div className="flex justify-center items-center py-4">
          <Link
            to="/create"
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full hover:from-amber-700 hover:to-orange-700 focus-ring transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            aria-label="Create Post">
            <Plus size={24} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;