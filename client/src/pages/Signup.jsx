import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../Backgrounds/Background";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../context/UserContext";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        form
      );
      login(res.data);
      navigate("/home");
    } catch (err) {
      setError("Failed to create account");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => navigate("/")}
          className="text-white hover:text-gray-300 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6">
            Create an account
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
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
                value={form.password}
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
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-all"
            >
              Sign up
            </button>
          </form>
          <p className="mt-4 text-center text-white/60">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
