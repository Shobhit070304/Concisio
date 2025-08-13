import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
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
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")}
          className="text-amber-900 hover:text-amber-700 flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
  
      {/* Signup Content */}
      <div className="w-full max-w-sm px-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
          <p className="text-amber-800/70">Join us today, it's quick & easy</p>
        </div>
  
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-400 text-red-600 text-sm">
            {error}
          </div>
        )}
  
        <form onSubmit={handleSignup} className="space-y-2">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-amber-300 focus:border-amber-500 px-1 py-3 focus:outline-none placeholder-amber-800/40 text-gray-900 transition-colors"
              required
            />
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-amber-300 focus:border-amber-500 px-1 py-3 focus:outline-none placeholder-amber-800/40 text-gray-900 transition-colors"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-amber-300 focus:border-amber-500 px-1 py-3 focus:outline-none placeholder-amber-800/40 text-gray-900 transition-colors"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-amber-300 focus:border-amber-500 px-1 py-3 focus:outline-none placeholder-amber-800/40 text-gray-900 transition-colors"
              required
            />
          </div>
  
          <div>
          <button
            type="submit"
            className="w-full py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
          </div>
        </form>
  
        <p className="mt-4 text-center text-amber-800/70 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-900 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );

};

export default Signup;
