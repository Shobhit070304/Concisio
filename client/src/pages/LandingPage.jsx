import React from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import { Github } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>
      <div className="absolute top-0 right-0 p-4 z-20 flex gap-2">
        <button
          onClick={() => navigate('/signup')}
          className="px-4 py-2 text-sm text-white hover:text-gray-300 transition-all"
        >
          Sign up
        </button>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
        >
          Login
        </button>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            What do you want to build?
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Prompt, run, edit, and deploy full-stack web and mobile apps.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all">
              Get Started
            </button>
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