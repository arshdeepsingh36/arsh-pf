import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  return (
    <div className="bg-background min-h-screen text-text flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background Ripple Effect (simulated with Framer Motion) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7a5eb4]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-2xl w-full text-center"
        >
          <motion.h1 
            className="text-[120px] md:text-[180px] font-sans font-extrabold tracking-tighter text-black/5 leading-none mb-4 flex justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            404
          </motion.h1>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
            <h2 className="font-serif text-4xl md:text-6xl text-text font-bold mb-4 tracking-tight">
              Oops! You're <span className="text-[#7a5eb4]">Lost.</span>
            </h2>
            <p className="font-sans text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-text text-white rounded-full font-sans font-bold shadow-md transition-transform hover:bg-black"
              >
                <span>Back to Home</span>
                <div className="w-5 h-5 bg-[#7a5eb4] text-white rounded-full flex items-center justify-center text-xs">↗</div>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
