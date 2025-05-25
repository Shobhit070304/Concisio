import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Graduate Student",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "NoteTube saved me hours of note-taking during my research. The summaries are incredibly accurate and the PDF format is perfect for my study sessions.",
    stars: 5
  },
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "As someone who consumes a lot of educational content, NoteTube has been a game-changer. I can quickly review key points without rewatching entire videos.",
    stars: 5
  },
  {
    name: "Michael Chang",
    role: "Software Engineer",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "The technical accuracy of NoteTube's summaries is impressive. It correctly captures complex coding concepts from tutorial videos, saving me tons of time.",
    stars: 4
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            What Our Users Say
          </h2>
          <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 transition-all hover:bg-white/10"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                  />
                ))}
              </div>
              <p className="text-blue-100/90 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-blue-100/70 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative element */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-purple-900/20 to-transparent -z-10"></div>
    </section>
  );
};

export default TestimonialsSection;