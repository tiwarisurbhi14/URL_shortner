import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const userName = auth.user?.name?.toUpperCase();

  const onLogout = () => {
    dispatch(logout());
    navigate({ to: "/" });
  };
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-fuchsia-800 shadow-lg text-white backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text drop-shadow-lg hover:scale-105 transition-transform duration-300"
          >
            nanoURL
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            {isAuthenticated ? (
              <>
                <span className="text-white/90 font-medium">
                  Welcome, <span className="font-bold">{userName}</span>
                </span>
                <button
                  onClick={onLogout}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm font-semibold transition backdrop-blur-md shadow"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm font-semibold transition backdrop-blur-md shadow"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            {isAuthenticated ? (
              <>
                <span className="block text-white/90">Welcome, {userName}</span>
                <button
                  onClick={onLogout}
                  className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm font-semibold transition backdrop-blur-md shadow"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm font-semibold transition backdrop-blur-md shadow"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
