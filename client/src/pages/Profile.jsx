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
    // <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-gray-900 bg-opacity-80 backdrop-blur-xl" />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 fixed inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-gray-900 bg-opacity-80 backdrop-blur-xl">
      <Link
        to="/home"
        className="px-4 py-2 flex gap-2 absolute top-4 left-4 rounded-md text-white bg-black hover:bg-gray-800"
      >
        <ArrowBigLeft />
        Back
      </Link>

      <div className="bg-gray-800 text-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
        />
        <h2 className="text-xl font-bold">{user?.name}</h2>
        <p className=" mb-6">{user?.email}</p>

        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="w-full flex justify-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/update-profile"
            className="w-full flex justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </Link>
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
