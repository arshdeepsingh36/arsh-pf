import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative w-full min-h-[60vh] bg-background overflow-hidden flex flex-col justify-between pt-12 pb-8">
      
      <div className="relative w-[90%] md:w-[80%] mx-auto bg-text rounded-[2rem] pt-24 pb-8 flex flex-col justify-between overflow-hidden">
        
        {/* Background Video with Left-to-Right Fade Mask */}
        <div className="absolute top-0 right-[-10%] bottom-0 z-0 w-[70%]">
          <div className="absolute inset-0 bg-gradient-to-r from-text via-text/50 to-transparent z-10"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover object-center opacity-60"
            src="/vi11.mp4"
          ></video>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center items-start text-left">
          <div className="max-w-4xl">
            <div className="flex items-center justify-start gap-2 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-300 font-sans">My Philosophy</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-6 leading-[1.15] tracking-tight">
              "Creativity is intelligence <br/> <span className="italic text-[#b3a1e0]">having fun.</span>"
            </h2>
            <p className="text-gray-400 font-sans tracking-widest uppercase text-xs font-bold">
              – Albert Einstein
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full mt-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-start items-center py-6 border-t border-gray-700 font-sans text-xs font-semibold tracking-widest uppercase text-gray-300 gap-8">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Behance</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden flex justify-center mt-12 pb-4 pointer-events-none select-none">
        <span className="text-[14vw] leading-[0.8] font-serif tracking-tighter whitespace-nowrap font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 bg-[length:200%_auto] animate-gradient-flow opacity-60">
          Arshdeep S.
        </span>
      </div>

    </footer>
  );
};

export default Footer;
