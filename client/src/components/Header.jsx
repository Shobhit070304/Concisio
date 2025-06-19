import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // Create a random avatar URL using DiceBear
  let avatar;
  if (user) {
    const randomSeed = user.name + Math.floor(Math.random() * 10000);
    avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}`;
  }

  return (
    <header className="py-5 px-32 text-center flex items-center justify-between tracking-wider">
      <Link to="/" className="text-white font-bold text-2xl italic">
        Concisio
      </Link>
      <div className="flex items-center space-x-4">
        {!user ? (
          <div className="absolute top-0 right-32 p-4 z-20 flex gap-2">
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 text-sm text-white hover:text-gray-300 transition-all"
            >
              Sign up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
            >
              Login
            </button>
          </div>
        ) : (
          <Link to="/profile" className="cursor-pointer">
            <img
              src={avatar || undefined}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
