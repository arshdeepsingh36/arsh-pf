import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { useData } from '../context/DataContext';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { articles } = useData();

  const article = articles.find(
    (a) =>
      String(a.slug) === String(slug) ||
      String(a.id) === String(slug) ||
      a.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === String(slug)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="bg-background min-h-screen text-text flex flex-col">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-6 text-center">
          <h1 className="font-serif text-5xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 max-w-md mb-8">
            The journal entry you are looking for might have been moved or unpublished.
          </p>
          <Link
            to="/blog"
            className="px-8 py-3 bg-text text-white rounded-full font-sans font-bold shadow-md hover:bg-black transition-colors"
          >
            Back to Journal
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const keyTakeawaysList = Array.isArray(article.keyTakeaways)
    ? article.keyTakeaways
    : typeof article.keyTakeaways === 'string'
    ? article.keyTakeaways.split('\n').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="bg-background min-h-screen text-text">
      <Navigation />
      
      <main className="pt-32 md:pt-48 pb-24 relative min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Article Header */}
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-16">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-wider text-gray-500 hover:text-[#7a5eb4] transition-colors mb-12">
              <span className="text-xl leading-none">&larr;</span> Back to Journal
            </Link>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a5eb4] font-sans">
                {article.tag || 'Insight'}
              </span>
              <span className="text-xs text-gray-400 font-sans">{article.date || 'Recent'}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight tracking-tighter mb-8">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shadow-xs">
                <img 
                  src={article.authorAvatar || '/avatar1.png'} 
                  alt={article.author || 'Author'} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.src = '/avatar1.png'; }}
                />
              </div>
              <div className="text-left">
                <p className="font-sans font-bold text-sm">{article.author || 'Arshdeep S.'}</p>
                <p className="font-sans text-xs text-gray-500">{article.authorRole || 'Creative Designer'}</p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {article.img && (
            <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
              <div className="w-full aspect-video md:aspect-[21/9] bg-gray-200 rounded-3xl overflow-hidden shadow-sm">
                <img 
                  src={article.img} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>
          )}

          {/* Article Body */}
          <div className="max-w-3xl mx-auto px-6 md:px-12 prose prose-lg prose-gray font-sans">
            {article.lead && (
              <p className="lead text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed whitespace-pre-line">
                {article.lead}
              </p>
            )}

            {article.section1Title && (
              <h2 className="font-serif text-3xl font-bold text-text mb-6">{article.section1Title}</h2>
            )}
            
            {article.section1Content && (
              <p className="mb-10 text-gray-600 leading-relaxed whitespace-pre-line">
                {article.section1Content}
              </p>
            )}

            {article.quote && (
              <blockquote className="border-l-4 border-[#7a5eb4] pl-6 py-2 my-10 bg-gray-50 rounded-r-lg">
                <p className="text-2xl font-serif italic text-gray-800 m-0">
                  "{article.quote}"
                </p>
              </blockquote>
            )}

            {article.section2Title && (
              <h2 className="font-serif text-3xl font-bold text-text mb-6">{article.section2Title}</h2>
            )}
            
            {article.section2Content && (
              <p className="mb-10 text-gray-600 leading-relaxed whitespace-pre-line">
                {article.section2Content}
              </p>
            )}
            
            {keyTakeawaysList.length > 0 && (
              <div className="my-10 bg-gray-100 p-8 rounded-2xl">
                <h3 className="font-bold text-lg mb-4">Key Takeaways</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {keyTakeawaysList.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </div>
            )}

            {article.conclusion && (
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {article.conclusion}
              </p>
            )}
          </div>
        </motion.div>
      </main>

      <Contact />
      <Footer />
    </div>
  );
};

export default BlogPostPage;
