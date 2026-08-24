import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/success');
  };
  return (
    <section id="contact" className="py-16 md:py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Left Side: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400 font-sans block mb-6">Got a project?</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-none tracking-tighter mb-8">
              Let's build <br/> <span className="italic text-[#b3a1e0]">something.</span>
            </h2>
            
            <p className="text-gray-400 font-sans text-lg mb-14 max-w-md">
              Fill out the form to tell me about your project, or skip the queue and connect with me directly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 font-sans">
              <a href="https://wa.me/0000000000" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a href="mailto:arshdeep@example.com" className="flex items-center justify-center gap-2 px-8 py-4 border border-gray-600 text-white rounded-full font-bold uppercase tracking-wider text-sm hover:border-white hover:bg-white hover:text-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Email Me
              </a>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-xs font-sans text-gray-400 uppercase tracking-widest mb-2" htmlFor="name">What's your name?</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="John Doe *" 
                  className="bg-transparent border-b border-gray-700 pb-4 text-xl font-sans text-white focus:outline-none focus:border-[#b3a1e0] transition-colors placeholder:text-gray-700" 
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-sans text-gray-400 uppercase tracking-widest mb-2" htmlFor="email">What's your email?</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="john@example.com *" 
                  className="bg-transparent border-b border-gray-700 pb-4 text-xl font-sans text-white focus:outline-none focus:border-[#b3a1e0] transition-colors placeholder:text-gray-700" 
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-sans text-gray-400 uppercase tracking-widest mb-2" htmlFor="whatsapp">WhatsApp Number</label>
                <input 
                  type="tel" 
                  id="whatsapp"
                  placeholder="+1 (234) 567-8900" 
                  className="bg-transparent border-b border-gray-700 pb-4 text-xl font-sans text-white focus:outline-none focus:border-[#b3a1e0] transition-colors placeholder:text-gray-700" 
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-sans text-gray-400 uppercase tracking-widest mb-2" htmlFor="message">Tell me about your project</label>
                <textarea 
                  id="message"
                  rows="4"
                  placeholder="Hello, I would like to talk about... *" 
                  className="bg-transparent border-b border-gray-700 pb-4 text-xl font-sans text-white focus:outline-none focus:border-[#b3a1e0] transition-colors placeholder:text-gray-700 resize-none" 
                  required
                ></textarea>
              </div>

              <button type="submit" className="self-start mt-4 px-10 py-4 bg-white text-gray-900 rounded-full font-sans font-bold uppercase tracking-wider text-sm hover:bg-[#b3a1e0] hover:text-white transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
