import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const { name, password, confirmPassword } = formData;

    if (!name || !password || !confirmPassword) {
      setMessage("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/update`,
        {
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        navigate("/profile");
         update(res.data);
      }

      setFormData({
        name: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating profile : ", error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="relative z-10 w-full flex items-center justify-center min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-gray-900 bg-opacity-80 backdrop-blur-xl" />
      <Link
        to="/profile"
        className="px-4 py-2 flex gap-2 absolute top-4 left-4 rounded-md text-white bg-black hover:bg-gray-800"
      >
        <ArrowBigLeft />
        Back
      </Link>
      <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Update profile
        </h2>
        {message && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/20"
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
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/20"
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
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/20"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-all"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
