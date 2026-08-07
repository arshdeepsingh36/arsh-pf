import React from 'react';
import { motion } from 'framer-motion';

const clientLogos = [
  "Acme Corp", "GlobalTech", "Nexus", "Vertex", "Lumina", "Acme Corp", "GlobalTech", "Nexus", "Vertex", "Lumina"
];

const Clients = () => {
  return (
    <section className="py-24 bg-background border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-xs font-bold tracking-widest uppercase text-gray-500 font-sans">Select Clients</span>
        </div>
      </div>

      <div className="relative flex w-full" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
        <motion.div 
          className="flex whitespace-nowrap items-center w-max gap-16 md:gap-32 px-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {clientLogos.map((client, index) => (
            <div key={index} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
              <div className="w-10 h-10 rounded bg-gray-300"></div>
              <span className="text-3xl font-bold font-sans text-gray-800">{client}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
