import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="border-t border-white/10 pt-8 text-center">
          <div className='flex flex-col items-center justify-center mb-4'>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              NoteTube
            </h3>
            <p className="text-blue-100/70 mb-2">
              Transform YouTube videos into comprehensive, shareable notes with the power of AI.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Shobhit070304" className="text-blue-100/70 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/shobhit-kumar-sharma-17bb4223a/" className="text-blue-100/70 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>

          </div>
          <p className="text-blue-100/70 text-sm">
            © {new Date().getFullYear()} NoteTube. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;