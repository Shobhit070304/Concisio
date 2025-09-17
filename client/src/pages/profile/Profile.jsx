import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import {
  ArrowBigLeft,
  FileText,
  Settings,
  LogOut,
  MessageSquare,
  Clock,
  User,
  Shield,
  Mail,
  Calendar
} from "lucide-react";
import axios from "axios";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  // const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(null);

  // Create a random avatar URL using DiceBear
  const randomSeed = user.name + Math.floor(Math.random() * 10000);
  const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}`;

  // Mock data for recent activity
  const recentActivity = [
    { type: "summary", title: "YouTube Summary: AI Advancements 2023", date: "2 days ago" },
    { type: "chat", title: "Chat with Concisio AI", date: "3 days ago" },
    { type: "summary", title: "Text Summary: Research Paper", date: "1 week ago" },
    { type: "summary", title: "Document Summary: Annual Report", date: "2 weeks ago" }
  ];

  useEffect(() => {
    async function getProfile() {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Profile data:", res.data.data.user);
      if (res.data.success) {
        setUserData(res.data.data.user);
      }
    }
    getProfile();
  }, [])

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-amber-50 to-amber-100 px-4 sm:px-6 py-8 sm:py-12">
      {/* Background pattern */}
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
        className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2 text-amber-900 hover:text-amber-700 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition text-sm sm:text-base z-10"
      >
        <ArrowBigLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Back</span>
      </Link>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto w-full mt-12 sm:mt-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            {/* Header Background */}
            <div className="h-32 sm:h-40 bg-gradient-to-r from-amber-400 to-amber-600"></div>

            {/* Profile Info */}
            <div className="px-6 sm:px-8 pb-6 pt-14 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="absolute -mt-16 sm:-mt-20 left-1/2 sm:left-8 transform -translate-x-1/2 sm:translate-x-0">
                <div className="relative">
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
              </div>

              {/* User Info - Only visible on larger screens */}
              <div className="hidden sm:block flex-1 sm:pl-32">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                  <Mail size={14} />
                  {user?.email}
                </p>
              </div>

              {/* User Info - Only visible on mobile */}
              <div className="sm:hidden text-center">
                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-1.5">
                  <Mail size={14} />
                  {user?.email}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0">
                <Link
                  to="/update-profile"
                  className="py-2 px-4 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition shadow-sm hover:shadow flex items-center gap-1.5 text-sm"
                >
                  <Settings size={16} />
                  <span>Edit Profile</span>
                </Link>
                <button
                  onClick={logout}
                  className="py-2 px-4 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition shadow-sm hover:shadow flex items-center gap-1.5 text-sm"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                className={`px-6 py-3 flex items-center gap-2 text-sm font-medium whitespace-nowrap text-amber-600 border-b-2 border-amber-500

                  }`}
              >
                <User size={16} />
                Profile
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {/* Profile Tab */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Information */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <User size={18} className="text-amber-500" />
                    User Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                      <p className="text-gray-800">{user?.name}</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Email</label>
                      <p className="text-gray-800">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Member Since</label>
                      {/* Show created at propely */}
                      <p className="text-gray-800">{
                        userData ? new Date(userData.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                        }) : 'N/A'
                      }</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription Info */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Free Plan</h3>
                    <p className="text-amber-100 text-sm">You're currently on the free plan. Upgrade for more features!</p>
                  </div>
                  <button className="px-4 py-2 bg-white text-amber-600 rounded-lg text-sm font-medium hover:bg-amber-50 transition shadow-sm">
                    Upgrade
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
