import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: '',
    botcheck: false
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'arshdeep@example.com';
  const rawWhatsapp = import.meta.env.VITE_CONTACT_WHATSAPP || '0000000000';
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam honeypot trap
    if (formData.botcheck) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    if (accessKey && accessKey.trim() !== '') {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey.trim(),
            name: formData.name,
            email: formData.email,
            phone: formData.whatsapp || 'Not provided',
            message: formData.message,
            subject: `New Portfolio Inquiry from ${formData.name}`,
            from_name: `${formData.name} (Portfolio)`
          })
        });

        let result;
        try {
          result = await response.json();
        } catch (_) {
          result = { success: response.ok };
        }

        if (result?.success || response.ok) {
          setStatus('idle');
          setFormData({ name: '', email: '', whatsapp: '', message: '', botcheck: false });
          navigate('/success');
        } else {
          setStatus('error');
          setErrorMessage(result?.message || 'Failed to send message. Please verify your access key.');
        }
      } catch (err) {
        console.error('Contact submission error:', err);
        setStatus('error');
        setErrorMessage('Network connection error. Please try again or reach out directly.');
      }
    } else {
      // In development / demo mode when key is not yet set:
      // Store locally so messages are not lost and simulate success
      try {
        const saved = JSON.parse(localStorage.getItem('arsh_portfolio_messages') || '[]');
        saved.unshift({
          ...formData,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('arsh_portfolio_messages', JSON.stringify(saved));
      } catch (_) {}

      setTimeout(() => {
        setStatus('idle');
        navigate('/success');
      }, 500);
    }
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
              <a 
                href={`https://wa.me/${cleanWhatsapp}`} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a 
                href={`mailto:${contactEmail}`} 
                className="flex items-center justify-center gap-2 px-8 py-4 border border-gray-600 text-white rounded-full font-bold uppercase tracking-wider text-sm hover:border-white hover:bg-white hover:text-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
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
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              {/* Spam protection honeypot */}
              <input 
                type="checkbox" 
                name="botcheck" 
                checked={formData.botcheck}
                onChange={handleChange}
                className="hidden" 
                style={{ display: 'none' }} 
                tabIndex={-1}
                autoComplete="off"
              />

              {errorMessage && (
                <div className="p-4 bg-red-900/40 border border-red-500/40 rounded-xl text-red-200 text-sm font-sans flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span>
                  <div>
                    <p className="font-semibold">Unable to send message</p>
                    <p className="text-xs text-red-300 mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              {!accessKey && (
                <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-indigo-200 text-xs font-sans flex items-start gap-2.5">
                  <span className="text-[#b3a1e0] text-sm">💡</span>
                  <div>
                    <span className="font-semibold text-white">Inbox Delivery:</span> Add your free access key to <code className="bg-black/50 px-1 py-0.5 rounded text-[#b3a1e0]">.env</code> (<code className="text-gray-300">VITE_WEB3FORMS_ACCESS_KEY</code>) to deliver directly to your email. <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="underline text-[#b3a1e0] hover:text-white font-medium">Get free key (takes 30s) &rarr;</a>
                  </div>
                </div>
              )}

              <div className="flex flex-col">
                <label className="text-xs font-sans text-gray-400 uppercase tracking-widest mb-2" htmlFor="name">What's your name?</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+1 (234) 567-8900" 
                  className="bg-transparent border-b border-gray-700 pb-4 text-xl font-sans text-white focus:outline-none focus:border-[#b3a1e0] transition-colors placeholder:text-gray-700" 
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-sans text-gray-400 uppercase tracking-widest mb-2" htmlFor="message">Tell me about your project</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Hello, I would like to talk about... *" 
                  className="bg-transparent border-b border-gray-700 pb-4 text-xl font-sans text-white focus:outline-none focus:border-[#b3a1e0] transition-colors placeholder:text-gray-700 resize-none" 
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="self-start mt-2 px-10 py-4 bg-white text-gray-900 rounded-full font-sans font-bold uppercase tracking-wider text-sm hover:bg-[#b3a1e0] hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
