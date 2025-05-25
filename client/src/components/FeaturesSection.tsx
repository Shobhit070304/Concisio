import React from 'react';
import { 
  FileText, 
  Share2, 
  Zap, 
  BookOpen, 
  Sparkles, 
  Clock, 
  FileSearch,
  Smartphone
} from 'lucide-react';

const FeatureCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 transition-all hover:bg-white/10 border border-white/10">
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-blue-100/80 leading-relaxed">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap size={24} className="text-white" />,
      title: "Instant Summaries",
      description: "Get comprehensive video summaries in seconds, no matter the video length or complexity."
    },
    {
      icon: <FileText size={24} className="text-white" />,
      title: "Ready-to-Share PDFs",
      description: "Download beautifully formatted PDF notes that are perfect for sharing or studying."
    },
    {
      icon: <BookOpen size={24} className="text-white" />,
      title: "Key Point Extraction",
      description: "Our AI identifies and highlights the most important information from any video."
    },
    {
      icon: <Share2 size={24} className="text-white" />,
      title: "One-Click Sharing",
      description: "Share your notes instantly with classmates, colleagues, or friends via email or link."
    },
    {
      icon: <Sparkles size={24} className="text-white" />,
      title: "AI-Powered Accuracy",
      description: "Advanced algorithms ensure your summaries capture all essential information accurately."
    },
    {
      icon: <Clock size={24} className="text-white" />,
      title: "Time Stamps",
      description: "Jump back to exact moments in videos with integrated timestamps in your notes."
    },
    {
      icon: <FileSearch size={24} className="text-white" />,
      title: "Smart Search",
      description: "Quickly find specific information within your notes using our intelligent search feature."
    },
    {
      icon: <Smartphone size={24} className="text-white" />,
      title: "Cross-Device Access",
      description: "Access your notes from any device with our responsive web app and mobile interface."
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Powerful Features
          </h2>
          <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
            NoteTube transforms how you consume video content with these powerful tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute top-1/2 left-0 w-full h-40 bg-gradient-to-r from-purple-500/20 to-blue-500/20 transform -translate-y-1/2 -skew-y-3 -z-10"></div>
    </section>
  );
};

export default FeaturesSection;