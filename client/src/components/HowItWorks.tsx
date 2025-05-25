import React from 'react';
import { Link, Search, FileText } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Link size={28} className="text-white" />,
      title: "Paste YouTube URL",
      description: "Simply paste any YouTube video link into NoteTube and let our AI get to work."
    },
    {
      icon: <Search size={28} className="text-white" />,
      title: "AI Analyzes Content",
      description: "Our advanced AI watches and analyzes the video, identifying key points and insights."
    },
    {
      icon: <FileText size={28} className="text-white" />,
      title: "Get Your Notes",
      description: "Within seconds, receive a comprehensive summary and professionally formatted PDF."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            How NoteTube Works
          </h2>
          <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
            Turn any YouTube video into comprehensive notes in just three simple steps
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 relative">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 h-full transition-all hover:bg-white/10">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white text-center">
                  {step.title}
                </h3>
                <p className="text-blue-100/80 text-center">
                  {step.description}
                </p>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-2 bg-gradient-to-r from-purple-500 to-blue-500 z-20"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl -z-10"></div>
    </section>
  );
};

export default HowItWorks;