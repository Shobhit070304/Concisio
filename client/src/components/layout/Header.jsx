import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";

function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  // Create a random avatar URL using DiceBear
  let avatar;
  if (user) {
    const randomSeed = user.name + Math.floor(Math.random() * 10000);
    avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}`;
  }

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-xl text-black font-semibold">Concisio</span>
          <span className="text-2xl font-bold text-blue-400 leading-none translate-y-[-1px]">
            .
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {user && (
            <Link
              to="/"
              className="hover:text-gray-900 hover:border-b-2 border-amber-400"
            >
              Home
            </Link>
          )}
          <a
            href="#about"
            className="hover:text-gray-900 hover:border-b-2 border-amber-400"
          >
            About
          </a>
          <a
            href="#features"
            className="hover:text-gray-900 hover:border-b-2 border-amber-400"
          >
            Features
          </a>
          {user && (
            <Link
              to="/dashboard"
              className="hover:text-gray-900 hover:border-b-2 border-amber-400"
            >
              Dashboard
            </Link>
          )}
          {!user && (
            <>
              <a
                href="#how"
                className="hover:text-gray-900 hover:border-b-2 border-amber-400"
              >
                How it works
              </a>
              <a
                href="#faq"
                className="hover:text-gray-900 hover:border-b-2 border-amber-400"
              >
                FAQs
              </a>
            </>
          )}
        </nav>
        {!user ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-black"
            >
              Sign up
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="px-4 py-2 text-sm border border-gray-300 rounded text-white bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
            <Link to="/profile" className="cursor-pointer">
              <img
                src={avatar || undefined}
                alt="User Avatar"
                className="w-10 h-10 rounded-full mx-auto border-4 border-blue-500"
              />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
