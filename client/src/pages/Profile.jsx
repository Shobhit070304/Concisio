import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);

  console.log(user);

  // Create a random avatar URL using DiceBear
  const randomSeed = user.name + Math.floor(Math.random() * 10000);
  const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-amber-50 to-amber-100 px-6">
      {/* Background elements */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,24,39,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.15,
        }}
      />

      {/* Back Button */}
      <Link
        to="/home"
        className="absolute top-6 left-6 px-4 py-2 flex items-center gap-2 text-amber-900 hover:text-amber-700 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition"
      >
        <ArrowBigLeft className="w-5 h-5" />
        Back
      </Link>

      {/* Profile Content */}
      <div className="flex flex-col items-center text-center max-w-xs w-full">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg shadow-amber-200/50 mb-6"
        />
        <h2 className="text-3xl font-bold text-gray-900 mb-1">{user?.name}</h2>
        <p className="text-amber-800/70 mb-8">{user?.email}</p>

        <div className="flex flex-col gap-3 w-full">
          <div className="w-full flex gap-2 items-center">
            <Link
              to="/dashboard"
              className="py-2 px-4 w-1/2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition shadow-sm hover:shadow-md"
            >
              Dashboard
            </Link>
            <Link
              to="/update-profile"
              className="py-2 px-4 w-1/2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition shadow-sm hover:shadow-md"
            >
              Update Profile
            </Link>
          </div>
          <button
            onClick={logout}
            className="py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-sm hover:shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
