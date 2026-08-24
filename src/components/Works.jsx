import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Works = () => {
  const { projects } = useData();
  const [visibleCount, setVisibleCount] = useState(4);

  return (
    <section id="works" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500 font-sans">Featured Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans text-text max-w-2xl leading-tight">
              Selected projects I've built with ambitious brands and bold teams
            </h2>
          </div>
          <Link
            to="/projects"
            className="bg-text text-white px-6 py-3 rounded-full font-sans text-sm font-medium hover:scale-105 transition-transform whitespace-nowrap inline-block text-center flex-shrink-0"
          >
            View all projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, visibleCount).map((project, index) => {
            const tags = Array.isArray(project.deliverables)
              ? project.deliverables
              : typeof project.type === 'string'
              ? project.type.split(',').map(s => s.trim())
              : [];

            return (
              <Link to={`/project/${project.id}`} key={project.id}>
                <motion.div 
                  className="group cursor-pointer h-full flex flex-col"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="overflow-hidden rounded-[24px] mb-6 aspect-[4/3] bg-gray-100 flex-shrink-0">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop';
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <h3 className="text-3xl font-serif text-text group-hover:text-[#7a5eb4] transition-colors">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-sans rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {visibleCount < projects.length && (
            <button 
              onClick={() => setVisibleCount(prev => prev + 2)}
              className="px-8 py-3 bg-white border border-gray-300 text-text rounded-full font-sans font-medium hover:bg-gray-100 transition-colors"
            >
              View More
            </button>
          )}
          <Link
            to="/projects"
            className="px-8 py-3 bg-text text-white rounded-full font-sans font-medium hover:bg-black transition-transform hover:scale-105 shadow-sm"
          >
            Explore All Projects ({projects.length}) →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Works;
