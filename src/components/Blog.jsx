import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const articles = [
  { title: "The Future of Web Design in 2026", date: "Aug 12, 2026", tag: "Design", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" },
  { title: "Mastering Framer Motion for React", date: "Jul 28, 2026", tag: "Development", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop" },
  { title: "Why Typography Matters in UI", date: "Jul 05, 2026", tag: "Typography", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop" }
];

const Blog = () => {
  return (
    <section id="blog" className="py-32 bg-background relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 mb-16">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-xs font-bold tracking-widest uppercase text-gray-500 font-sans">Journal</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text leading-[1.1] tracking-tight">
            Thoughts & <span className="italic text-[#7a5eb4]">Insights.</span>
          </h2>
          <Link to="/blog" className="bg-text text-white px-6 py-3 rounded-full font-sans text-sm font-medium hover:scale-105 transition-transform whitespace-nowrap inline-block text-center">
            Read all articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div 
              key={i}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl mb-6 overflow-hidden relative">
                 <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7a5eb4] font-sans">{article.tag}</span>
                <span className="text-xs text-gray-400 font-sans">{article.date}</span>
              </div>
              <h3 className="text-2xl font-serif text-gray-900 leading-snug group-hover:text-[#7a5eb4] transition-colors">
                {article.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
