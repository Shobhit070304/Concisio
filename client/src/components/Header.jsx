import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

function Header() {
  const { user } = useContext(AuthContext);
  // Create a random avatar URL using DiceBear
  const randomSeed = user.name + Math.floor(Math.random() * 10000);
  const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}`;

  return (
    <header className="py-5 px-32 text-center flex items-center justify-between tracking-wider">
      <div className="text-white font-bold text-2xl italic">NoteTube</div>
      <div className="flex items-center space-x-4">
        <Link to="/profile" className="cursor-pointer">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mx-auto mb-4 border-4 border-blue-500"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
