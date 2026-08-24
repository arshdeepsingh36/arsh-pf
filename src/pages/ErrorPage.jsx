import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const ErrorPage = ({ code = "500", message = "Internal Server Error", details = "Something went wrong on our end. We're working to fix it." }) => {
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
          <motion.h1 
            className="text-[120px] md:text-[180px] font-sans font-extrabold tracking-tighter text-black/5 leading-none mb-4 flex justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {code}
          </motion.h1>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-text font-bold mb-4 tracking-tight">
              {message.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? <span key={i} className="text-[#7a5eb4]">{word}</span> : word + ' '
              )}
            </h2>
            <p className="font-sans text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
              {details}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-text rounded-full font-sans font-bold shadow-sm transition-transform hover:bg-gray-50 w-full sm:w-auto justify-center"
              >
                <span>Try Again</span>
                <div className="w-5 h-5 bg-gray-200 text-text rounded-full flex items-center justify-center text-xs">↻</div>
              </motion.button>
              
              <Link to="/" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-text text-white rounded-full font-sans font-bold shadow-md transition-transform hover:bg-black w-full justify-center"
                >
                  <span>Back to Home</span>
                  <div className="w-5 h-5 bg-[#7a5eb4] text-white rounded-full flex items-center justify-center text-xs">↗</div>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ErrorPage;
