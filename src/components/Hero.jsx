import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const initRipples = () => {
      if (window.$ && window.$.fn.ripples && heroRef.current) {
        try {
          window.$(heroRef.current).ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
          });
        } catch (e) {
          console.error("Ripples failed", e);
        }
      }
    };

    const timeout = setTimeout(initRipples, 1600);

    return () => {
      clearTimeout(timeout);
      if (window.$ && window.$.fn && window.$.fn.ripples && heroRef.current) {
        try {
          window.$(heroRef.current).ripples('destroy');
        } catch (e) { }
      }
    };
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(
    scrollYProgress,
    [0, 0.11, 0.19, 0.30, 0.38, 0.49, 0.56, 0.68, 0.75, 1],
    ["0em", "0em", "-1.3em", "-1.3em", "-2.6em", "-2.6em", "-3.9em", "-3.9em", "-5.2em", "-5.2em"]
  );

  return (
    <section id="home" ref={containerRef} className="relative w-full h-[400vh]">
      <div className="sticky top-0 w-full h-screen flex flex-col justify-end pb-4 md:pb-12 overflow-hidden">

        {/* Background Image Animation Wrapper */}
        <motion.div
          className="absolute inset-[-5%] w-[110%] h-[110%] z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {/* Ripple Target Layer */}
          <div
            ref={heroRef}
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/banner-1.png)' }}
          />
        </motion.div>

        {/* Big Name in Background */}
        <div className="absolute top-[20%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-[60%] w-full flex justify-center z-10 pointer-events-none">
          <motion.h1
            className="text-[45px] sm:text-[80px] md:text-[180px] lg:text-[250px] font-sans font-extrabold tracking-tighter text-black/15 flex justify-center items-center whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          >
            Arshdeep S.
          </motion.h1>
        </div>

        {/* Cinematic Avatar Reveal Overlay (Centered) */}
        <div className="absolute bottom-[20vh] md:bottom-0 left-1/2 -translate-x-1/2 w-[110%] sm:w-[95%] md:w-[85%] max-w-[420px] md:max-w-[550px] z-10 pointer-events-none">
          <img
            src="/avatar1.png"
            alt="Arshdeep — Creative Designer"
            className="w-full h-auto object-contain"
          />
          <img
            src="/avatar2.png"
            alt=""
            className="absolute inset-0 w-full h-auto object-contain avatar-reveal-mask"
          />
        </div>

        {/* Bottom Fade for Text Readability */}
        <div className="absolute bottom-0 left-0 w-full h-[60vh] md:h-[30vh] bg-gradient-to-t from-white via-white via-[50%] to-transparent z-20 pointer-events-none" />

        {/* Bottom Text Overlays (Left and Right) */}
        <div className="relative z-30 flex flex-col md:flex-row justify-between items-end w-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-none mb-2 md:mb-8">

          {/* Bottom Left Text */}
          <div className="text-left w-full md:w-1/2 pointer-events-auto mb-2 md:mb-0 z-30 relative">
            <h2 className="font-serif text-[2rem] sm:text-4xl md:text-5xl lg:text-7xl leading-[1.1] text-text font-bold mb-2 tracking-tight drop-shadow-sm">
              I make <br />
              {/* Slot-machine wrapper for the 5 sliding texts */}
              <span className="relative flex justify-start items-start w-full -mt-1 md:-mt-2 h-[1.3em] overflow-hidden text-[#7a5eb4]">
                <motion.span style={{ y }} className="flex flex-col">
                  <span className="h-[1.3em] flex items-center justify-start whitespace-nowrap">Creative Things.</span>
                  <span className="h-[1.3em] flex items-center justify-start whitespace-nowrap">AI Ads.</span>
                  <span className="h-[1.3em] flex items-center justify-start whitespace-nowrap">Branding.</span>
                  <span className="h-[1.3em] flex items-center justify-start whitespace-nowrap">Social Media.</span>
                  <span className="h-[1.3em] flex items-center justify-start whitespace-nowrap">Digital Products.</span>
                </motion.span>
              </span>
            </h2>
          </div>

          {/* Bottom Right Info */}
          <div className="text-right w-full md:w-1/2 flex justify-start md:justify-end mt-4 md:mt-0 pointer-events-auto z-30 relative">
            <div className="flex flex-col items-start md:items-end max-w-xs">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                <a href="/#contact" className="bg-text px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
                  <span className="font-sans font-bold text-sm text-white">Hire Me</span>
                  <div className="w-5 h-5 bg-[#7a5eb4] text-white rounded-full flex items-center justify-center text-xs">↗</div>
                </a>
                <div className="flex gap-1 text-orange-500">
                  {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                </div>
                <span className="text-gray-900 font-bold">4.9</span>
              </div>
              <p className="font-sans text-sm text-gray-600 leading-relaxed text-left md:text-right mt-2">
                Creative Designer with 3+ years of experience crafting digital experiences that combine aesthetics with deep functionality.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
