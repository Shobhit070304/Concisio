import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";
import axios from "axios";
import { ArrowBigLeft } from "lucide-react";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { update } = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/update`,
        { formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        update(res.data.data);
        navigate("/profile");
      } else {
        setMessage(res.data.message || "Update failed");
      }
    } catch (err) {
      setMessage("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-amber-50 to-amber-100 px-4 sm:px-6">
      {/* Background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,24,39,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.15
        }}
      />

      {/* Back Button */}
      <Link
        to="/profile"
        className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2 text-amber-900 hover:text-amber-700 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition text-sm sm:text-base z-10"
      >
        <ArrowBigLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Back</span>
      </Link>

      {/* Update Form */}
      <div className="p-4 sm:p-8 w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-4">
          Update Profile
        </h2>
        {message && (
          <div className="mb-4 p-2 sm:p-3 bg-red-50 border-l-4 border-red-400 text-red-600 text-xs sm:text-sm">
            {message}
          </div>
        )}
        <form onSubmit={handleUpdate} className="space-y-2">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-amber-300 focus:border-amber-500 px-1 py-2 sm:py-3 focus:outline-none placeholder-amber-800/40 text-gray-900 transition-colors text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-amber-300 focus:border-amber-500 px-1 py-2 sm:py-3 focus:outline-none placeholder-amber-800/40 text-gray-900 transition-colors text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mb-4 bg-transparent border-b border-amber-300 focus:border-amber-500 px-1 py-2 sm:py-3 focus:outline-none placeholder-amber-800/40 text-gray-900 transition-colors text-sm sm:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-sm hover:shadow-md text-xs sm:text-sm"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
