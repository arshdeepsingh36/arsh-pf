import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Daniel Carter',
    role: 'Founder & CEO, NovaTech',
    quote: 'Arshdeep transformed our brand and website into a powerful growth engine.',
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=400&h=400',
    rotation: 'md:-rotate-6 md:translate-y-4 md:-translate-x-4 z-10',
  },
  {
    name: 'Ethan Walker',
    role: 'Product Director, Lumina Labs',
    quote: 'Their strategy and UI design elevated our entire product experience.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400',
    rotation: 'md:scale-105 z-20 shadow-2xl',
  },
  {
    name: 'Marcus Rivera',
    role: 'Head of Marketing, Horizon Collective',
    quote: 'Arshdeep helped us clarify our brand and launch confidently.',
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=400&h=400',
    rotation: 'md:rotate-6 md:translate-y-4 md:translate-x-4 z-10',
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#f9f8f6] relative overflow-hidden flex flex-col items-center">

      {/* Header */}
      <div className="text-center mb-16 px-6 relative z-30">
        <div className="inline-flex items-center gap-2 mb-6 border border-gray-200 rounded-full px-4 py-1.5 bg-white shadow-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-700 font-sans">Client Voices</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text leading-[1.1] max-w-3xl mx-auto tracking-tight">
          Helping ambitious brands <br /> build their digital future
        </h2>
      </div>

      {/* Cards Area */}
      <div className="relative w-full max-w-5xl mx-auto px-6 mb-24 min-h-[400px] flex items-center justify-center">
        {/* Faint Red Lines Background */}
        <div className="absolute inset-0 flex flex-col justify-center gap-[6px] opacity-[0.25] z-0 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-full h-[1px] bg-red-500"></div>
          ))}
        </div>

        {/* Fanned Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 w-full mt-8 md:mt-0">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`bg-gradient-to-b from-[#2a2a2a] to-[#111] p-8 md:p-10 rounded-[2rem] flex flex-col items-center text-center shadow-xl border border-gray-700/50 transform transition-all duration-500 hover:z-30 hover:scale-110 ${t.rotation}`}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-8 border border-gray-600/50 shadow-inner">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-lg md:text-xl font-serif text-white leading-tight mb-10 max-w-[240px]">
                "{t.quote}"
              </p>
              <div className="mt-auto">
                <h4 className="font-sans font-bold text-white text-sm mb-1">{t.name}</h4>
                <span className="font-sans text-xs text-gray-400">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Statistics Row */}
      <div className="max-w-4xl mx-auto px-6 w-full relative z-30 mt-8 md:mt-0">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0">

          <div className="flex-1 flex flex-col items-center text-center">
            <h3 className="text-5xl md:text-6xl font-serif text-text mb-2 flex items-center">
              27<span className="text-red-500 text-3xl md:text-4xl ml-1 font-sans font-light">+</span>
            </h3>
            <span className="font-sans text-xs font-medium text-gray-500 uppercase tracking-widest">Projects Delivered</span>
          </div>

          <div className="hidden md:block w-px h-16 bg-gray-200"></div>

          <div className="flex-1 flex flex-col items-center text-center">
            <h3 className="text-5xl md:text-6xl font-serif text-text mb-2 flex items-center">
              8<span className="text-red-500 text-3xl md:text-4xl ml-1 font-sans font-light">+</span>
            </h3>
            <span className="font-sans text-xs font-medium text-gray-500 uppercase tracking-widest">Industries Impacted</span>
          </div>

          <div className="hidden md:block w-px h-16 bg-gray-200"></div>

          <div className="flex-1 flex flex-col items-center text-center">
            <h3 className="text-5xl md:text-6xl font-serif text-text mb-2 flex items-center">
              3<span className="text-red-500 text-3xl md:text-4xl ml-1 font-sans font-light">+</span>
            </h3>
            <span className="font-sans text-xs font-medium text-gray-500 uppercase tracking-widest">Years of Experience</span>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Testimonials;
