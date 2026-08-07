import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const NavLink = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick} className="relative group hover:text-gray-500 transition-colors py-1">
    {children}
    <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1 h-1 bg-text rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
  </a>
);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md py-3' : 'bg-transparent py-4'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="/#home" className="flex items-center gap-2">
          <img src="/logo-h.png" alt="Arshdeep Logo" className="h-10 md:h-12 w-auto object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
          <NavLink href="/#works">Work</NavLink>
          <NavLink href="/#about">About</NavLink>
          <NavLink href="/#services">Services</NavLink>
          <NavLink href="/#blog">Insights</NavLink>
          <NavLink href="/#contact">Contact</NavLink>
        </nav>

        <div className="hidden md:block">
          <a href="/#contact" className="bg-text text-white px-6 py-2.5 rounded-full font-sans text-sm font-medium hover:scale-105 transition-transform inline-block">
            Hire me
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-text"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-gray-200 py-4 px-6 shadow-xl md:hidden flex flex-col gap-4 font-sans"
          >
            <a href="/#works" onClick={closeMobileMenu} className="py-2 border-b border-gray-100">Work</a>
            <a href="/#about" onClick={closeMobileMenu} className="py-2 border-b border-gray-100">About</a>
            <a href="/#services" onClick={closeMobileMenu} className="py-2 border-b border-gray-100">Services</a>
            <a href="/#blog" onClick={closeMobileMenu} className="py-2 border-b border-gray-100">Insights</a>
            <a href="/#contact" onClick={closeMobileMenu} className="py-2 border-b border-gray-100">Contact</a>
            <a href="/#contact" onClick={closeMobileMenu} className="bg-text text-white px-6 py-3 rounded-full mt-4 font-sans text-sm font-medium w-full text-center inline-block">
              Hire me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;

