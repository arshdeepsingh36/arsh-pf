import React from 'react';
import { motion } from 'framer-motion';
import { PixelImage } from "../registry/magicui/pixel-image";

const About = () => {
  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex items-center gap-2 mb-16">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-xs font-bold tracking-widest uppercase text-gray-500 font-sans">About Me</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Placeholder */}
          <motion.div 
            className="w-full aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <PixelImage
              src="/portrait.png"
              customGrid={{ rows: 8, cols: 6 }}
              grayscaleAnimation
            />
          </motion.div>

          {/* Right: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text leading-[1.1] tracking-tight mb-8">
              I craft digital experiences that combine aesthetics with <span className="italic text-[#7a5eb4]">deep functionality.</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 font-sans">
              <p>
                Hi, I'm Arshdeep. With over 3 years of experience in creative design and frontend development, I bridge the gap between how things look and how they work.
              </p>
              <p>
                My approach is rooted in understanding user behavior and business goals, translating them into elegant, scalable, and impactful digital products that stand out in today's crowded landscape.
              </p>
            </div>
            
            <div className="mt-12 flex gap-4">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-text text-white rounded-full font-sans font-medium hover:bg-gray-800 transition-colors inline-block text-center">
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
