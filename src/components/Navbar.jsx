import { LogOut, MessageSquare, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice.js";

const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          
          {/* LEFT — LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-lg font-semibold text-gray-800">
              Chatify
            </span>
          </Link>

          {/* RIGHT — PROFILE */}
          {authUser && (
            <div className="flex items-center gap-4">
              
              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {authUser?.name || "Profile"}
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
