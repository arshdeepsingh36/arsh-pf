import React from 'react';
import { motion } from 'framer-motion';

const row1 = ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "React.js", "Next.js", "Tailwind CSS", "TypeScript", "Node.js"];
const row2 = ["JavaScript", "Figma", "Framer Motion", "Vite", "GraphQL", "JavaScript", "Figma", "Framer Motion", "Vite", "GraphQL"];
const row3 = ["PostgreSQL", "MongoDB", "Redux", "Docker", "Python", "PostgreSQL", "MongoDB", "Redux", "Docker", "Python"];

const LogoItem = ({ skill, baseOpacity = "opacity-40" }) => (
  <div className={`flex items-center gap-3 ${baseOpacity} hover:opacity-100 transition-opacity grayscale hover:grayscale-0 mx-6 lg:mx-10`}>
    <div className="w-8 h-8 rounded bg-gray-300 shadow-inner"></div>
    <span className="text-xl md:text-2xl font-bold font-sans text-gray-800">{skill}</span>
  </div>
);

const ClientsMarquee = () => {
  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Text */}
        <div className="lg:w-1/3 flex-shrink-0 text-left">
          <div className="inline-flex items-center gap-2 mb-8 border border-gray-200 rounded-full px-4 py-1.5 bg-white shadow-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-600 font-sans">My Skill Set</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text leading-[1.1] tracking-tight">
            Building experiences<br className="hidden md:block"/>with modern tools
          </h2>
        </div>

        {/* Right Side: 3 Rows of Marquees with Faded Edges */}
        <div 
          className="lg:w-2/3 w-full relative flex flex-col gap-16 overflow-hidden"
          style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 50%, transparent 100%)' }}
        >
          {/* Row 1: Slide Left */}
          <div className="relative flex w-full">
            <motion.div 
              className="flex whitespace-nowrap items-center w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {row1.map((skill, index) => <LogoItem key={index} skill={skill} baseOpacity="opacity-20" />)}
            </motion.div>
          </div>

          {/* Row 2: Slide Right */}
          <div className="relative flex w-full">
            <motion.div 
              className="flex whitespace-nowrap items-center w-max"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {row2.map((skill, index) => <LogoItem key={index} skill={skill} baseOpacity="opacity-60" />)}
            </motion.div>
          </div>

          {/* Row 3: Slide Left */}
          <div className="relative flex w-full">
            <motion.div 
              className="flex whitespace-nowrap items-center w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
            >
              {row3.map((skill, index) => <LogoItem key={index} skill={skill} baseOpacity="opacity-20" />)}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientsMarquee;
