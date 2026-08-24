import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  ArrowLeft, 
  FolderPlus, 
  FileText, 
  Download, 
  Upload, 
  RotateCcw, 
  X, 
  Search,
  ExternalLink,
  Layers,
  Sparkles,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';

const emptyProject = {
  title: '',
  subtitle: '',
  type: 'Website, UX/UI',
  img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  role: 'Lead Designer',
  client: '',
  year: '2026',
  deliverables: 'UI/UX Design, Brand Identity, Prototyping',
  websiteUrl: 'https://example.com',
  challenge: '',
  processImg1: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1000&auto=format&fit=crop',
  solution: '',
  processImg2: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000&auto=format&fit=crop',
  processImg3: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
  impact: ''
};

const emptyArticle = {
  title: '',
  slug: '',
  tag: 'Design',
  date: '',
  author: 'Arshdeep S.',
  authorRole: 'Creative Designer',
  authorAvatar: '/avatar1.png',
  img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
  lead: '',
  section1Title: 'The Core Concept',
  section1Content: '',
  quote: '',
  section2Title: 'Execution & Strategies',
  section2Content: '',
  keyTakeaways: 'Prioritize simplicity\nIterate with real feedback\nCraft delightful micro-interactions',
  conclusion: ''
};

const AdminPage = () => {
  const { 
    projects, 
    articles, 
    isAuthenticated,
    login,
    logout,
    addProject, 
    updateProject, 
    deleteProject, 
    addArticle, 
    updateArticle, 
    deleteArticle, 
    resetToDefaults,
    exportData,
    importData 
  } = useData();

  // Auth lock screen states
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  // Tab & search states
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState(emptyProject);

  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [articleForm, setArticleForm] = useState(emptyArticle);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmittingAuth(true);

    const res = await login(passwordInput);
    setIsSubmittingAuth(false);

    if (res.success) {
      setPasswordInput('');
      showToast('Welcome back, Admin!');
    } else {
      setAuthError(res.error || 'Incorrect passcode');
      setShakeKey(prev => prev + 1);
    }
  };

  // Filtered lists
  const filteredProjects = projects.filter(p => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.client?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articles.filter(a => 
    a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.tag?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Project Handlers
  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setProjectForm(emptyProject);
    setProjectModalOpen(true);
  };

  const handleOpenEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      ...proj,
      deliverables: Array.isArray(proj.deliverables) ? proj.deliverables.join(', ') : proj.deliverables || ''
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      alert('Please enter a project title');
      return;
    }

    if (editingProjectId) {
      const res = await updateProject(editingProjectId, projectForm);
      if (res.success) showToast(`Project "${projectForm.title}" updated successfully!`);
    } else {
      const res = await addProject(projectForm);
      if (res.success) showToast(`Project "${projectForm.title}" created successfully!`);
    }
    setProjectModalOpen(false);
  };

  const handleDeleteProject = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteProject(id);
      showToast(`Project deleted.`);
    }
  };

  // Article Handlers
  const handleOpenAddArticle = () => {
    setEditingArticleId(null);
    setArticleForm({
      ...emptyArticle,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    });
    setArticleModalOpen(true);
  };

  const handleOpenEditArticle = (art) => {
    setEditingArticleId(art.id || art.slug);
    setArticleForm({
      ...art,
      keyTakeaways: Array.isArray(art.keyTakeaways) ? art.keyTakeaways.join('\n') : art.keyTakeaways || ''
    });
    setArticleModalOpen(true);
  };

  const handleSaveArticle = async (e) => {
    e.preventDefault();
    if (!articleForm.title.trim()) {
      alert('Please enter an article title');
      return;
    }

    if (editingArticleId) {
      const res = await updateArticle(editingArticleId, articleForm);
      if (res.success) showToast(`Article "${articleForm.title}" updated successfully!`);
    } else {
      const res = await addArticle(articleForm);
      if (res.success) showToast(`Article "${articleForm.title}" published successfully!`);
    }
    setArticleModalOpen(false);
  };

  const handleDeleteArticle = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteArticle(id);
      showToast(`Article deleted.`);
    }
  };

  // JSON Import handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const res = await importData(json);
        if (res.success) {
          showToast('Data imported successfully to backend!');
        } else {
          alert('Failed to import: ' + res.error);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  /* -------------------------------------------------------------
     IF NOT AUTHENTICATED: SHOW SECURE LOCK SCREEN
  ------------------------------------------------------------- */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 selection:bg-[#7a5eb4]/40 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7a5eb4]/10 rounded-full blur-[120px] pointer-events-none" />

        <Link
          to="/"
          className="absolute top-8 left-8 text-neutral-400 hover:text-white flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Website</span>
        </Link>

        <motion.div
          key={shakeKey}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 max-w-md w-full bg-neutral-900/90 border border-neutral-800 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#7a5eb4]/15 border border-[#7a5eb4]/30 flex items-center justify-center text-[#b3a1e0] shadow-[0_0_30px_-5px_rgba(122,94,180,0.3)]">
              <Lock className="w-8 h-8" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-white mb-2">
              Studio <span className="text-[#b3a1e0] italic">Access</span>
            </h1>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Protected Administrator Area. Enter your master security passcode to continue.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Master Passcode"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-[#7a5eb4] transition-colors placeholder:text-neutral-600 tracking-wider"
                />
                <KeyRound className="w-4 h-4 text-neutral-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-rose-400 text-xs mt-2.5 px-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{authError}</span>
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmittingAuth || !passwordInput}
              className="w-full py-3.5 bg-white text-black font-semibold text-sm rounded-2xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSubmittingAuth ? (
                <span className="animate-pulse">Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-neutral-900" />
                  <span>Unlock Studio</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-800/80 text-center">
            <span className="text-[11px] text-neutral-500">
              Server-side cryptographic token verification
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  /* -------------------------------------------------------------
     AUTHENTICATED CMS DASHBOARD
  ------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-[#f7f6f3] text-[#1a1a1a] font-sans flex flex-col">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -40, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 bg-[#111827] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-xs text-black font-bold">✓</div>
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200/80 sticky top-0 z-30 px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Website</span>
          </Link>
          <div className="h-6 w-px bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7a5eb4] animate-pulse" />
            <h1 className="font-serif text-2xl font-bold tracking-tight text-gray-900">
              CMS <span className="text-[#7a5eb4] font-normal italic">Studio</span>
            </h1>
          </div>
        </div>

        {/* Global actions & Logout */}
        <div className="flex items-center gap-3">
          {activeTab === 'projects' && (
            <button
              onClick={handleOpenAddProject}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] text-white rounded-full text-sm font-medium hover:bg-black transition-transform hover:scale-105 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          )}

          {activeTab === 'blogs' && (
            <button
              onClick={handleOpenAddArticle}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7a5eb4] text-white rounded-full text-sm font-medium hover:bg-[#684ca3] transition-transform hover:scale-105 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>New Article</span>
            </button>
          )}

          <Link
            to="/blog"
            target="_blank"
            className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            title="Open Journal in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>

          <button
            onClick={() => {
              logout();
              showToast('Logged out securely.');
            }}
            className="p-2.5 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
            title="Lock & Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl w-full mx-auto px-6 md:px-12 py-8 flex-1">
        
        {/* Navigation Tabs & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-gray-200/90 shadow-xs">
            <button
              onClick={() => { setActiveTab('projects'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FolderPlus className="w-4 h-4" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('blogs'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'blogs'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Journal Articles ({articles.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Security & Backup</span>
            </button>
          </div>

          {activeTab !== 'settings' && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#7a5eb4] transition-colors"
              />
            </div>
          )}
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <section>
            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
                <FolderPlus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-gray-700 mb-2">No projects found</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                  {searchQuery ? 'Try adjusting your search criteria.' : 'Start building your portfolio by adding your first project.'}
                </p>
                <button
                  onClick={handleOpenAddProject}
                  className="px-6 py-2.5 bg-[#111827] text-white rounded-full text-sm font-medium hover:bg-black"
                >
                  Create Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
                  >
                    {/* Thumbnail & Badges */}
                    <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">
                        {project.year || '2026'}
                      </div>
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        <Link
                          to={`/project/${project.id}`}
                          target="_blank"
                          className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 hover:bg-white hover:text-[#7a5eb4] transition-colors shadow-sm"
                          title="View live case study"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a5eb4] mb-1.5">
                          <span>{project.client || 'Client Project'}</span>
                          <span>•</span>
                          <span>{project.role || 'Design'}</span>
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2 leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-4">
                          {project.subtitle || project.challenge || 'No description provided.'}
                        </p>
                      </div>

                      {/* Deliverables / Tags */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(project.deliverables) ? project.deliverables : (project.type || '').split(','))
                            .slice(0, 2)
                            .map((tag, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-700 text-[10px] px-2 py-0.5 rounded-full font-medium">
                                {tag.trim()}
                              </span>
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditProject(project)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id, project.title)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB 2: BLOG ARTICLES */}
        {activeTab === 'blogs' && (
          <section>
            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-gray-700 mb-2">No articles found</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                  {searchQuery ? 'Try adjusting your search criteria.' : 'Share your insights by writing your first journal entry.'}
                </p>
                <button
                  onClick={handleOpenAddArticle}
                  className="px-6 py-2.5 bg-[#7a5eb4] text-white rounded-full text-sm font-medium hover:bg-[#684ca3]"
                >
                  Write Article
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <motion.div
                    key={article.id || article.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
                  >
                    {/* Thumbnail & Badges */}
                    <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                      <img
                        src={article.img}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-[#7a5eb4] text-white text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {article.tag || 'Insight'}
                      </div>
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        <Link
                          to={`/blog/${article.slug}`}
                          target="_blank"
                          className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 hover:bg-white hover:text-[#7a5eb4] transition-colors shadow-sm"
                          title="View live article"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs text-gray-400 font-sans mb-1.5">
                          {article.date || 'Recent'}
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-4">
                          {article.lead || article.section1Content || 'No summary text.'}
                        </p>
                      </div>

                      {/* Author / Actions */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={article.authorAvatar || '/avatar1.png'}
                            alt={article.author}
                            className="w-6 h-6 rounded-full object-cover bg-gray-200"
                            onError={(e) => { e.target.src = '/avatar1.png'; }}
                          />
                          <span className="text-xs text-gray-700 font-medium">{article.author || 'Arshdeep S.'}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditArticle(article)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Article"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(article.id || article.slug, article.title)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB 3: SECURITY & BACKUP */}
        {activeTab === 'settings' && (
          <section className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-gray-900">Server Data & Security Status</h2>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Your portfolio content is securely stored on the server file system with zero data stored in client browsers. All mutation endpoints require signed cryptographic authorization.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="text-3xl font-serif font-bold text-[#7a5eb4] mb-1">{projects.length}</div>
                  <div className="text-sm font-medium text-gray-700">Active Case Studies</div>
                  <div className="text-xs text-gray-400 mt-1">Rendered on Homepage and /project/:id</div>
                </div>
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="text-3xl font-serif font-bold text-[#111827] mb-1">{articles.length}</div>
                  <div className="text-sm font-medium text-gray-700">Journal Articles</div>
                  <div className="text-xs text-gray-400 mt-1">Rendered on Homepage, /blog, and /blog/:slug</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={exportData}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#111827] text-white rounded-full text-sm font-semibold hover:bg-black transition-transform hover:scale-105 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup (JSON)</span>
                </button>

                <label className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs">
                  <Upload className="w-4 h-4 text-[#7a5eb4]" />
                  <span>Import Backup (.json)</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={async () => {
                    if (window.confirm('Reset all projects and blog posts back to default demo data on the server?')) {
                      await resetToDefaults();
                      showToast('Reset to default seed data.');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-full text-sm font-semibold hover:bg-red-100 transition-colors ml-auto"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Defaults</span>
                </button>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* MODAL: PROJECT ADD / EDIT */}
      <AnimatePresence>
        {projectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-200"
            >
              {/* Modal Header */}
              <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    {editingProjectId ? 'Edit Project' : 'Create New Project'}
                  </h2>
                  <p className="text-xs text-gray-500">Fill in the project details below. All fields will appear live on your case study page.</p>
                </div>
                <button
                  onClick={() => setProjectModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleSaveProject} className="p-8 overflow-y-auto space-y-8 flex-1">
                
                {/* 1. Basic Info */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#7a5eb4] mb-4 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>1. Overview & Media</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="e.g. Rivermark"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Category / Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={projectForm.type}
                        onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value })}
                        placeholder="e.g. Website, UX/UI, Branding"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Subtitle / Elevator Pitch</label>
                      <input
                        type="text"
                        value={projectForm.subtitle}
                        onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                        placeholder="A short punchy summary of what this project accomplished..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Main Hero & Card Image URL</label>
                      <div className="flex gap-4 items-center">
                        <input
                          type="url"
                          required
                          value={projectForm.img}
                          onChange={(e) => setProjectForm({ ...projectForm, img: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                        />
                        {projectForm.img && (
                          <img
                            src={projectForm.img}
                            alt="Preview"
                            className="w-16 h-12 rounded-lg object-cover border border-gray-200 bg-gray-100 flex-shrink-0"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Metadata */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#7a5eb4] mb-4 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>2. Sidebar Meta Details</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Client</label>
                      <input
                        type="text"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                        placeholder="e.g. Acme Corp"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Role</label>
                      <input
                        type="text"
                        value={projectForm.role}
                        onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                        placeholder="e.g. Lead Designer"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Year</label>
                      <input
                        type="text"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                        placeholder="2026"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Live Website Link</label>
                      <input
                        type="url"
                        value={projectForm.websiteUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, websiteUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div className="sm:col-span-2 md:col-span-4">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Deliverables (comma-separated)</label>
                      <input
                        type="text"
                        value={projectForm.deliverables}
                        onChange={(e) => setProjectForm({ ...projectForm, deliverables: e.target.value })}
                        placeholder="UI/UX Design, Brand Identity, Motion Design, Prototyping"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Case Study Story */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#7a5eb4] mb-4 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>3. Case Study Narrative</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">The Challenge</label>
                      <textarea
                        rows="3"
                        value={projectForm.challenge}
                        onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                        placeholder="Describe the initial problem, user friction, and project objectives..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Process Image 1 (Full width)</label>
                      <input
                        type="url"
                        value={projectForm.processImg1}
                        onChange={(e) => setProjectForm({ ...projectForm, processImg1: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">The Solution</label>
                      <textarea
                        rows="3"
                        value={projectForm.solution}
                        onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                        placeholder="Explain how you solved the problem through research, design tokens, and components..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Process Image 2 (Grid left)</label>
                        <input
                          type="url"
                          value={projectForm.processImg2}
                          onChange={(e) => setProjectForm({ ...projectForm, processImg2: e.target.value })}
                          placeholder="https://..."
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Process Image 3 (Grid right)</label>
                        <input
                          type="url"
                          value={projectForm.processImg3}
                          onChange={(e) => setProjectForm({ ...projectForm, processImg3: e.target.value })}
                          placeholder="https://..."
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">The Impact & Results</label>
                      <textarea
                        rows="2"
                        value={projectForm.impact}
                        onChange={(e) => setProjectForm({ ...projectForm, impact: e.target.value })}
                        placeholder="Key metrics, conversion lift, app store reviews, or client feedback..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer actions */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
                  <button
                    type="button"
                    onClick={() => setProjectModalOpen(false)}
                    className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-[#111827] text-white rounded-full text-sm font-medium hover:bg-black transition-transform hover:scale-105"
                  >
                    {editingProjectId ? 'Save Changes' : 'Publish Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: BLOG ADD / EDIT */}
      <AnimatePresence>
        {articleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-200"
            >
              {/* Modal Header */}
              <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    {editingArticleId ? 'Edit Article' : 'Write New Article'}
                  </h2>
                  <p className="text-xs text-gray-500">Publish your design thoughts, development insights, and case studies.</p>
                </div>
                <button
                  onClick={() => setArticleModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleSaveArticle} className="p-8 overflow-y-auto space-y-8 flex-1">
                
                {/* 1. Article Header */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#7a5eb4] mb-4 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>1. Title & Meta</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Article Title *</label>
                      <input
                        type="text"
                        required
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        placeholder="e.g. The Future of Web Design in 2026"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Category / Tag</label>
                      <input
                        type="text"
                        value={articleForm.tag}
                        onChange={(e) => setArticleForm({ ...articleForm, tag: e.target.value })}
                        placeholder="Design, Typography, Tech"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">URL Slug (optional)</label>
                      <input
                        type="text"
                        value={articleForm.slug}
                        onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                        placeholder="e.g. future-of-web-design"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Publish Date</label>
                      <input
                        type="text"
                        value={articleForm.date}
                        onChange={(e) => setArticleForm({ ...articleForm, date: e.target.value })}
                        placeholder="e.g. Aug 12, 2026"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Author Name</label>
                      <input
                        type="text"
                        value={articleForm.author}
                        onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                        placeholder="Arshdeep S."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Hero & Lead */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#7a5eb4] mb-4 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>2. Featured Image & Lead</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Featured Image URL</label>
                      <div className="flex gap-4 items-center">
                        <input
                          type="url"
                          required
                          value={articleForm.img}
                          onChange={(e) => setArticleForm({ ...articleForm, img: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                        />
                        {articleForm.img && (
                          <img
                            src={articleForm.img}
                            alt="Preview"
                            className="w-16 h-12 rounded-lg object-cover border border-gray-200 bg-gray-100 flex-shrink-0"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Lead / Hook Paragraph</label>
                      <textarea
                        rows="2"
                        value={articleForm.lead}
                        onChange={(e) => setArticleForm({ ...articleForm, lead: e.target.value })}
                        placeholder="The introductory statement that sets the stage for the reader..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Body Sections */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#7a5eb4] mb-4 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>3. Article Body Content</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Section 1 Heading</label>
                      <input
                        type="text"
                        value={articleForm.section1Title}
                        onChange={(e) => setArticleForm({ ...articleForm, section1Title: e.target.value })}
                        placeholder="e.g. The Rise of Invisible Interfaces"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Section 1 Content</label>
                      <textarea
                        rows="4"
                        value={articleForm.section1Content}
                        onChange={(e) => setArticleForm({ ...articleForm, section1Content: e.target.value })}
                        placeholder="Detailed discussion on the first topic..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Featured Pull Quote</label>
                      <input
                        type="text"
                        value={articleForm.quote}
                        onChange={(e) => setArticleForm({ ...articleForm, quote: e.target.value })}
                        placeholder="e.g. Good design is obvious. Great design is transparent."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Section 2 Heading</label>
                      <input
                        type="text"
                        value={articleForm.section2Title}
                        onChange={(e) => setArticleForm({ ...articleForm, section2Title: e.target.value })}
                        placeholder="e.g. Embracing AI-Driven Personalization"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Section 2 Content</label>
                      <textarea
                        rows="4"
                        value={articleForm.section2Content}
                        onChange={(e) => setArticleForm({ ...articleForm, section2Content: e.target.value })}
                        placeholder="Detailed discussion on the second topic..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Key Takeaways (one per line)</label>
                      <textarea
                        rows="3"
                        value={articleForm.keyTakeaways}
                        onChange={(e) => setArticleForm({ ...articleForm, keyTakeaways: e.target.value })}
                        placeholder="Point 1&#10;Point 2&#10;Point 3"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Conclusion / Final Thought</label>
                      <textarea
                        rows="2"
                        value={articleForm.conclusion}
                        onChange={(e) => setArticleForm({ ...articleForm, conclusion: e.target.value })}
                        placeholder="Wrapping up the insight and parting thought..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#7a5eb4]"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer actions */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
                  <button
                    type="button"
                    onClick={() => setArticleModalOpen(false)}
                    className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-[#7a5eb4] text-white rounded-full text-sm font-medium hover:bg-[#684ca3] transition-transform hover:scale-105"
                  >
                    {editingArticleId ? 'Save Changes' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-400">
        Portfolio CMS Studio • Protected by Server Authentication
      </footer>
    </div>
  );
};

export default AdminPage;
