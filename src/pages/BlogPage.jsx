import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { motion } from 'framer-motion';

const allArticles = [
  { id: 1, title: "The Future of Web Design in 2026", date: "Aug 12, 2026", tag: "Design", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "Mastering Framer Motion for React", date: "Jul 28, 2026", tag: "Development", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "Why Typography Matters in UI", date: "Jul 05, 2026", tag: "Typography", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, title: "Building Scalable Design Systems", date: "Jun 20, 2026", tag: "Design", img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, title: "The Psychology of Color in Branding", date: "Jun 10, 2026", tag: "Branding", img: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, title: "Optimizing React Performance", date: "May 22, 2026", tag: "Development", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop" },
];

function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen text-text">
      <Navigation />
      
      <section className="pt-40 pb-24 bg-background relative overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col items-center text-center mb-24">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400 font-sans block mb-6">Journal</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif leading-none tracking-tighter mb-8">
              Thoughts & <span className="italic text-[#7a5eb4]">Insights.</span>
            </h1>
            <p className="text-gray-500 font-sans text-xl max-w-2xl mx-auto">
              Exploring design, technology, and the future of digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {allArticles.map((article, index) => (
              <motion.div 
                key={article.id}
                className="group cursor-pointer flex flex-col h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              >
                <div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl mb-6 overflow-hidden relative shadow-sm">
                  <img 
                    src={article.img} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7a5eb4] font-sans">{article.tag}</span>
                    <span className="text-xs text-gray-400 font-sans">{article.date}</span>
                  </div>
                  <h3 className="text-3xl font-serif text-gray-900 leading-snug group-hover:text-[#7a5eb4] transition-colors">
                    {article.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
}

export default BlogPage;
