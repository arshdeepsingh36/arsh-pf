import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

function BlogPage() {
  const { articles } = useData();

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
            {articles.map((article, index) => (
              <Link to={`/blog/${article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={article.id || index}>
                <motion.div 
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
              </Link>
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
