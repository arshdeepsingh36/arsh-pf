import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: 'Rivermark', type: 'Website, Social Media', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, title: 'Fluxa', type: 'UX/UI, Growth', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, title: 'River', type: 'Website, Growth', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, title: 'Season', type: 'Website, UX/UI', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, title: 'Nexus', type: 'App Design, UX/UI', img: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1000&auto=format&fit=crop' },
  { id: 6, title: 'Oasis', type: 'Website, Branding', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop' },
];

const Works = () => {
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, visibleCount).map((project, index) => (
            <motion.div 
              key={project.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="overflow-hidden rounded-[24px] mb-6 aspect-[4/3] bg-gray-100">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-serif text-text">{project.title}</h3>
                <div className="flex gap-2">
                  {project.type.split(', ').map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-sans rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < projects.length && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 2)}
              className="px-8 py-3 bg-text text-white rounded-full font-sans font-medium hover:bg-gray-800 transition-colors"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Works;
