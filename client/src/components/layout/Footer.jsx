import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto text-center py-2">
        <div className="flex flex-col items-center gap-2">
          <div className="text-lg font-semibold text-black">Concisio</div>
          <p className="text-sm text-gray-600">
            Turn videos into clean, shareable notes with AI.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://github.com/Shobhit070304"
              className="text-gray-600 hover:text-gray-700"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/shobhit-kumar-sharma-17bb4223a/"
              className="text-gray-600 hover:text-gray-700"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Concisio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
