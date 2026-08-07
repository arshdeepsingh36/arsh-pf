import React from 'react';
import { motion } from 'framer-motion';

const services = [
  { id: '01', title: 'Brand Identity & Strategy', text: 'I build meaningful brand identities — from strategic positioning to visual systems that bring your brand to life.', tags: ['Positioning', 'Visual Identity', 'Design System'] },
  { id: '02', title: 'Digital Marketing & Growth', text: 'I craft modern brand identities built to thrive across digital platforms and evolving user behavior.', tags: ['Conversion Rate Optimization', 'Analytics', 'A/B Testing'] },
  { id: '03', title: 'Social Media & Content Marketing', text: 'I create strategic content and campaigns that grow audiences and strengthen brand presence.', tags: ['Content Strategy', 'Creative Production', 'Campaign Management'] },
  { id: '04', title: 'UI/UX & Product Design', text: 'I design intuitive interfaces and user journeys that enhance usability, engagement, and product experience.', tags: ['User Research', 'Interface Design', 'Product Scaling'] },
  { id: '05', title: 'Website Design & Development', text: 'I build fast, scalable websites designed for performance, clarity, and seamless digital experiences.', tags: ['UI/UX', 'Performance', 'SEO Setup'] },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Background circular lines */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-gray-200 pointer-events-none opacity-50"></div>
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 md:w-32 flex-shrink-0">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-2xl font-serif text-text">{service.id}</span>
              </div>
              
              <div>
                <h3 className="text-4xl md:text-5xl font-serif text-text mb-6 leading-tight">{service.title}</h3>
                <p className="text-gray-600 text-lg font-sans mb-8 max-w-lg">
                  {service.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-sans rounded-full font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
