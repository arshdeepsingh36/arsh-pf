import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { useData } from '../context/DataContext';

const ProjectPage = () => {
  const { id } = useParams();
  const { projects } = useData();

  const project = projects.find((p) => String(p.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="bg-background min-h-screen text-text flex flex-col">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-6 text-center">
          <h1 className="font-serif text-5xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-600 max-w-md mb-8">
            The case study you are looking for might have been moved or removed.
          </p>
          <Link
            to="/#works"
            className="px-8 py-3 bg-text text-white rounded-full font-sans font-bold shadow-md hover:bg-black transition-colors"
          >
            Explore Other Works
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const deliverablesList = Array.isArray(project.deliverables)
    ? project.deliverables
    : typeof project.deliverables === 'string'
    ? project.deliverables.split(',').map((d) => d.trim()).filter(Boolean)
    : [];

  return (
    <div className="bg-background min-h-screen text-text">
      <Navigation />
      
      <main className="pt-32 md:pt-48 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-16">
            <Link to="/#works" className="inline-flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-wider text-gray-500 hover:text-[#7a5eb4] transition-colors mb-8">
              <span className="text-xl leading-none">&larr;</span> Back to Projects
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight tracking-tighter mb-6">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-xl md:text-2xl text-gray-600 font-sans max-w-3xl leading-relaxed">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Hero Image */}
          {project.img && (
            <div className="w-full aspect-video md:aspect-[21/9] bg-gray-200 rounded-3xl overflow-hidden mb-16 shadow-sm">
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';
                }}
              />
            </div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Sidebar / Meta info */}
            <div className="lg:col-span-4 flex flex-col gap-8 font-sans">
              {project.role && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Role</h3>
                  <p className="text-lg font-medium text-text">{project.role}</p>
                </div>
              )}

              {project.client && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Client</h3>
                  <p className="text-lg font-medium text-text">{project.client}</p>
                </div>
              )}

              {project.year && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Year</h3>
                  <p className="text-lg font-medium text-text">{project.year}</p>
                </div>
              )}

              {deliverablesList.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Deliverables</h3>
                  <ul className="text-lg font-medium text-text space-y-1">
                    {deliverablesList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {project.websiteUrl && (
                <div className="pt-4 border-t border-gray-200">
                  <a 
                    href={project.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-text text-white rounded-full font-sans font-bold shadow-md transition-transform hover:scale-105"
                  >
                    <span>Visit Website</span>
                    <div className="w-5 h-5 bg-[#7a5eb4] text-white rounded-full flex items-center justify-center text-xs">↗</div>
                  </a>
                </div>
              )}
            </div>

            {/* Main Narrative Content */}
            <div className="lg:col-span-8 prose prose-lg prose-gray font-sans max-w-none">
              {project.challenge && (
                <>
                  <h2 className="font-serif text-3xl md:text-4xl text-text font-bold mb-6">The Challenge</h2>
                  <p className="text-gray-600 mb-10 leading-relaxed whitespace-pre-line">
                    {project.challenge}
                  </p>
                </>
              )}
              
              {project.processImg1 && (
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-10 shadow-2xs">
                  <img 
                    src={project.processImg1} 
                    alt={`${project.title} Process 1`} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}

              {project.solution && (
                <>
                  <h2 className="font-serif text-3xl md:text-4xl text-text font-bold mb-6">The Solution</h2>
                  <p className="text-gray-600 mb-10 leading-relaxed whitespace-pre-line">
                    {project.solution}
                  </p>
                </>
              )}

              {(project.processImg2 || project.processImg3) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {project.processImg2 && (
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-2xs">
                      <img 
                        src={project.processImg2} 
                        alt={`${project.title} Process 2`} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  {project.processImg3 && (
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-2xs">
                      <img 
                        src={project.processImg3} 
                        alt={`${project.title} Process 3`} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>
              )}

              {project.impact && (
                <>
                  <h2 className="font-serif text-3xl md:text-4xl text-text font-bold mb-6">The Impact</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {project.impact}
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      <Contact />
      <Footer />
    </div>
  );
};

export default ProjectPage;
