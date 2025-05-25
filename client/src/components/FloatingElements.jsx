import { FileText, Video } from "lucide-react";
import React from "react";

function FloatingElements() {
  return (
    <>
      {/* Floating elements */}
      <div className="hidden md:block absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl backdrop-blur-xl p-6 transform rotate-6 animate-float shadow-xl">
        <div className="flex items-center mb-4">
          <Video size={24} className="text-purple-400 mr-2" />
          <span className="text-white font-medium">Video Summary</span>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-white/20 rounded-full w-full"></div>
          <div className="h-3 bg-white/20 rounded-full w-5/6"></div>
          <div className="h-3 bg-white/20 rounded-full w-4/6"></div>
          <div className="h-3 bg-white/20 rounded-full w-5/6"></div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-1/3 right-48 w-48 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-xl p-6 transform -rotate-3 animate-float-delayed shadow-xl">
        <div className="flex items-center mb-4">
          <FileText size={24} className="text-blue-400 mr-2" />
          <span className="text-white font-medium">PDF Notes</span>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-white/20 rounded-full w-full"></div>
          <div className="h-3 bg-white/20 rounded-full w-4/6"></div>
          <div className="h-3 bg-white/20 rounded-full w-5/6"></div>
          <div className="h-3 bg-white/20 rounded-full w-3/6"></div>
        </div>
      </div>
    </>
  );
}

export default FloatingElements;
