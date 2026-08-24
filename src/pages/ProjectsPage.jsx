import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { useData } from '../context/DataContext';

const ProjectsPage = () => {
  const { projects } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extract unique categories
  const categories = ['All', ...new Set(
    projects.flatMap(p => 
      Array.isArray(p.deliverables) 
        ? p.deliverables 
        : typeof p.type === 'string' 
        ? p.type.split(',').map(s => s.trim()) 
        : []
    ).filter(Boolean)
  )].slice(0, 6);

  // Filter projects
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => {
        const typeStr = (p.type || '') + ' ' + (Array.isArray(p.deliverables) ? p.deliverables.join(' ') : (p.deliverables || ''));
        return typeStr.toLowerCase().includes(selectedCategory.toLowerCase());
      });

  return (
    <div className="bg-background min-h-screen text-text flex flex-col">
      <Navigation />

      <main className="pt-36 md:pt-48 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex-1 w-full">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500 font-sans">
              Archive & Portfolio
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter leading-tight mb-6">
            Selected <span className="italic text-[#7a5eb4]">Works.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed">
            A comprehensive showcase of digital products, branding systems, and web experiences crafted with care.
          </p>
        </div>

        {/* Filter Categories */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-sans font-semibold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#111827] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300 max-w-md mx-auto">
            <p className="text-gray-500 font-sans">No projects found under this category.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-6 py-2 bg-text text-white rounded-full text-xs font-semibold"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const tags = Array.isArray(project.deliverables)
                  ? project.deliverables
                  : typeof project.type === 'string'
                  ? project.type.split(',').map(s => s.trim())
                  : [];

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                  >
                    <Link to={`/project/${project.id}`} className="group block h-full flex flex-col">
                      <div className="overflow-hidden rounded-[28px] mb-6 aspect-[4/3] bg-gray-100 relative shadow-xs group-hover:shadow-xl transition-all duration-500">
                        <img
                          src={project.img}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        
                        {project.year && (
                          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-sans font-medium">
                            {project.year}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-baseline gap-4 mb-2">
                          <h3 className="text-3xl md:text-4xl font-serif text-text group-hover:text-[#7a5eb4] transition-colors leading-tight">
                            {project.title}
                          </h3>
                          <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text group-hover:bg-[#7a5eb4] group-hover:text-white transition-colors flex-shrink-0 text-sm">
                            ↗
                          </span>
                        </div>

                        {project.subtitle && (
                          <p className="text-gray-500 font-sans text-sm line-clamp-2 leading-relaxed mb-4">
                            {project.subtitle}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2 mt-auto pt-2">
                          {tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-sans rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Contact />
      <Footer />
    </div>
  );
};

export default ProjectsPage;
