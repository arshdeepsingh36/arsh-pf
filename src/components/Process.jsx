import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: '01', title: 'Discovery & Strategy', desc: 'Understanding your vision, target audience, and business goals to lay a solid foundation.' },
  { id: '02', title: 'UI/UX Design', desc: 'Crafting intuitive user journeys and stunning visual interfaces that align with your brand.' },
  { id: '03', title: 'Development', desc: 'Building robust, scalable, and high-performance digital products using modern technologies.' },
  { id: '04', title: 'Launch & Iterate', desc: 'Deploying the product to the world and continuously optimizing based on user feedback.' }
];

const Process = () => {
  return (
    <section className="py-32 bg-background relative border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 mb-16">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-xs font-bold tracking-widest uppercase text-gray-500 font-sans">My Process</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text leading-[1.1] tracking-tight mb-20 max-w-3xl">
          A proven approach to <span className="italic text-[#7a5eb4]">digital excellence.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line */}
          <div className="absolute top-6 left-6 right-6 h-px bg-gray-200 hidden lg:block z-0"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              className="relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-sm font-sans font-bold text-gray-800 mb-8 shadow-sm">
                {step.id}
              </div>
              <h3 className="text-2xl font-serif text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-500 font-sans leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
