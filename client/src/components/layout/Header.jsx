import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";
import { Menu, X } from "lucide-react";

function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
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
        {/* Desktop Auth Buttons */}
        {!user ? (
          <div className="hidden md:flex items-center gap-3">
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
          <div className="hidden md:flex items-center gap-3">
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
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4 py-3 space-y-3">
              <nav className="flex flex-col space-y-3 text-sm text-gray-700">
                {user && (
                  <Link
                    to="/"
                    className="hover:text-gray-900 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                )}
                <a
                  href="#about"
                  className="hover:text-gray-900 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#features"
                  className="hover:text-gray-900 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                {user && (
                  <Link
                    to="/dashboard"
                    className="hover:text-gray-900 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                {!user && (
                  <>
                    <a
                      href="#how"
                      className="hover:text-gray-900 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      How it works
                    </a>
                    <a
                      href="#faq"
                      className="hover:text-gray-900 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      FAQs
                    </a>
                  </>
                )}
              </nav>
              
              {/* Mobile Auth Buttons */}
              {!user ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-center text-gray-700 hover:text-gray-900 border border-gray-300 rounded"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-center bg-gray-900 text-white rounded hover:bg-black"
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <Link 
                      to="/profile" 
                      className="cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <img
                        src={avatar || undefined}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border-4 border-blue-500"
                      />
                    </Link>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-sm border border-gray-300 rounded text-white bg-red-500 hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
