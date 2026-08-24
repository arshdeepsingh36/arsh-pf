import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const SuccessPage = () => {
  return (
    <div className="bg-background min-h-screen text-text flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background Ripple Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7a5eb4]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-2xl w-full text-center"
        >
          <motion.div 
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
          >
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          
          <h1 className="font-serif text-5xl md:text-6xl text-text font-bold mb-6 tracking-tight">
            Thank <span className="text-[#7a5eb4] italic">You!</span>
          </h1>
          <p className="font-sans text-gray-600 max-w-md mx-auto mb-10 text-lg leading-relaxed">
            Your message has been successfully received. I'll get back to you as soon as possible.
          </p>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-text text-white rounded-full font-sans font-bold shadow-md transition-transform hover:bg-black"
            >
              <span>Back to Home</span>
              <div className="w-5 h-5 bg-[#7a5eb4] text-white rounded-full flex items-center justify-center text-xs">↗</div>
            </motion.button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessPage;
