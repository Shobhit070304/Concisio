import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../context/UserContext";

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
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        form
      );
      if (res.data.success) {
        await login(res.data.data);
        navigate("/home");
      } else {
        setError(res.data.message || "Failed to create account");
      }
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white text-gray-900">
      {/* Background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(600px 300px at 90% 10%, rgba(245,158,11,0.12), transparent 60%), radial-gradient(600px 300px at 10% 90%, rgba(244,114,182,0.10), transparent 60%), linear-gradient(to right, rgba(17,24,39,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,24,39,0.08) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 24px 24px, 24px 24px",
          opacity: 0.45
        }}
      />
      <div aria-hidden className="absolute inset-0" style={{
        background: "linear-gradient(180deg, rgba(245,158,11,0.06), rgba(255,255,255,0))"
      }} />

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate("/")}
          className="text-gray-900 hover:text-gray-700 flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Signup Content */}
      <div className="w-full max-w-sm px-4 sm:px-0 relative z-10">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Create an Account</h2>
          <p className="text-gray-600">Join us today, it's quick & easy</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-400 text-red-600 text-sm rounded-r">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-2 w-full max-w-sm mx-auto">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 px-1 py-3 focus:outline-none placeholder-gray-500/60 text-gray-900 transition-colors"
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
              className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 px-1 py-3 focus:outline-none placeholder-gray-500/60 text-gray-900 transition-colors"
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
              className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 px-1 py-3 focus:outline-none placeholder-gray-500/60 text-gray-900 transition-colors"
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
              className="w-full bg-transparent border-b border-gray-300 focus:border-gray-500 px-1 py-3 focus:outline-none placeholder-gray-500/60 text-gray-900 transition-colors"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition flex items-center justify-center gap-2 mt-6"
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

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-900 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );

};

export default Signup;
