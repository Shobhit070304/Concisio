import React from 'react';
import { ArrowRight, Terminal, Code, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-lg border border-white/20">
            <Terminal className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          What do you want to build?
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Prompt, run, edit, and deploy full-stack web and mobile apps.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button className="px-6 py-3 bg-white text-black hover:bg-gray-100 rounded-lg font-medium transition-all flex items-center justify-center gap-2 group">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg font-medium transition-all">
            View Documentation
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { 
              icon: <Code className="w-5 h-5 text-white" />,
              title: "Modern Development",
              description: "Build with the latest technologies and frameworks in a seamless environment."
            },
            { 
              icon: <Zap className="w-5 h-5 text-white" />,
              title: "Instant Deployment",
              description: "Deploy your projects with a single click to global edge networks."
            },
            { 
              icon: <Terminal className="w-5 h-5 text-white" />,
              title: "Powerful Tooling",
              description: "Access a complete suite of development tools built for productivity."
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;