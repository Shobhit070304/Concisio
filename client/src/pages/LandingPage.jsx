import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../Backgrounds/Background";
import { Github } from "lucide-react";
import { AuthContext } from "../context/UserContext";
import FloatingElements from "../components/FloatingElements"

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>
      <div className="w-full flex items-center justify-between px-[10%]">
        <h1 className="text-2xl absolute top-4 left-32 z-20 font-bold">Concisio</h1>

      
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
        <div className="absolute top-0 right-32 p-4 z-20 flex gap-2">
          <button
          onClick={logout}
          className="px-4 py-2 bg-transparent text-white rounded-lg curser-pointer border-[1px] transition"
        >
          Logout
        </button>
        </div>
      )}
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Smart summaries, instantly with AI.
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Get concise insights and export them as polished, ready-to-share
            PDFs.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/home"
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all"
            >
              Get Started
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              Import from GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
