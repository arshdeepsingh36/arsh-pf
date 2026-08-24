import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialProjects, initialArticles } from '../data/initialData';

const DataContext = createContext(null);

const STORAGE_KEY_PROJECTS = 'portfolio_cms_projects_v2';
const STORAGE_KEY_ARTICLES = 'portfolio_cms_articles_v2';
const TOKEN_KEY = 'cms_session_token_v2';
const MASTER_PASSCODE = 'admin2026!';

export const DataProvider = ({ children }) => {
  // 1. Initialize projects (from localStorage -> initialProjects fallback)
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading projects from storage', e);
    }
    return initialProjects;
  });

  // 2. Initialize articles (from localStorage -> initialArticles fallback)
  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ARTICLES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading articles from storage', e);
    }
    return initialArticles;
  });

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem(TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });

  // Keep localStorage continuously in sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {}
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
    } catch (e) {}
  }, [articles]);

  // Sync with backend API server if available
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const [projRes, artRes] = await Promise.allSettled([
        fetch('/api/projects'),
        fetch('/api/articles')
      ]);

      if (projRes.status === 'fulfilled' && projRes.value.ok) {
        const projData = await projRes.value.json();
        if (Array.isArray(projData) && projData.length > 0) {
          setProjects(projData);
        }
      }

      if (artRes.status === 'fulfilled' && artRes.value.ok) {
        const artData = await artRes.value.json();
        if (Array.isArray(artData) && artData.length > 0) {
          setArticles(artData);
        }
      }
    } catch (err) {
      // Backend not running; client local storage remains primary
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Helper for auth headers
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  });

  // Login handler
  const login = async (password) => {
    // 1. Check client-side passcode match
    if (password === MASTER_PASSCODE) {
      const fallbackToken = 'session_' + Date.now();
      setToken(fallbackToken);
      try {
        sessionStorage.setItem(TOKEN_KEY, fallbackToken);
      } catch (e) {}

      // 2. Also authenticate with backend if reachable
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.token) {
            setToken(data.token);
            sessionStorage.setItem(TOKEN_KEY, data.token);
          }
        }
      } catch (e) {}

      return { success: true };
    }

    // Try server if different password configured in environment
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        sessionStorage.setItem(TOKEN_KEY, data.token);
        return { success: true };
      }
      return { success: false, error: data.error || 'Incorrect passcode' };
    } catch (err) {
      return { success: false, error: 'Incorrect passcode.' };
    }
  };

  // Logout handler
  const logout = () => {
    setToken(null);
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (e) {}
  };

  // -------------------------------------------------------------
  // PROJECT MUTATIONS (Instant state + localStorage + Server sync)
  // -------------------------------------------------------------
  const addProject = async (newProject) => {
    const id = newProject.id || String(Date.now());
    const deliverables = Array.isArray(newProject.deliverables)
      ? newProject.deliverables
      : typeof newProject.deliverables === 'string'
      ? newProject.deliverables.split(',').map(d => d.trim()).filter(Boolean)
      : [];

    const formattedProject = {
      ...newProject,
      id,
      deliverables
    };

    // 1. Immediately update UI state
    setProjects((prev) => [formattedProject, ...prev]);

    // 2. Sync with backend API
    try {
      fetch('/api/projects', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formattedProject)
      }).catch(() => {});
    } catch (e) {}

    return { success: true, project: formattedProject };
  };

  const updateProject = async (id, updatedFields) => {
    const deliverables = Array.isArray(updatedFields.deliverables)
      ? updatedFields.deliverables
      : typeof updatedFields.deliverables === 'string'
      ? updatedFields.deliverables.split(',').map(d => d.trim()).filter(Boolean)
      : updatedFields.deliverables;

    const formatted = {
      ...updatedFields,
      id: String(id),
      deliverables
    };

    // 1. Immediately update UI state
    setProjects((prev) =>
      prev.map((p) => (String(p.id) === String(id) ? { ...p, ...formatted } : p))
    );

    // 2. Sync with backend API
    try {
      fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(formatted)
      }).catch(() => {});
    } catch (e) {}

    return { success: true, project: formatted };
  };

  const deleteProject = async (id) => {
    // 1. Immediately update UI state
    setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));

    // 2. Sync with backend API
    try {
      fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      }).catch(() => {});
    } catch (e) {}

    return { success: true };
  };

  // -------------------------------------------------------------
  // ARTICLE MUTATIONS (Instant state + localStorage + Server sync)
  // -------------------------------------------------------------
  const addArticle = async (newArticle) => {
    const id = newArticle.id || String(Date.now());
    const slug =
      newArticle.slug ||
      (newArticle.title
        ? newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : `post-${id}`);

    const keyTakeaways = Array.isArray(newArticle.keyTakeaways)
      ? newArticle.keyTakeaways
      : typeof newArticle.keyTakeaways === 'string'
      ? newArticle.keyTakeaways.split('\n').map(t => t.trim()).filter(Boolean)
      : [];

    const formattedArticle = {
      ...newArticle,
      id,
      slug,
      date:
        newArticle.date ||
        new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: newArticle.author || 'Arshdeep S.',
      authorRole: newArticle.authorRole || 'Creative Designer',
      authorAvatar: newArticle.authorAvatar || '/avatar1.png',
      keyTakeaways
    };

    // 1. Immediately update UI state
    setArticles((prev) => [formattedArticle, ...prev]);

    // 2. Sync with backend API
    try {
      fetch('/api/articles', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formattedArticle)
      }).catch(() => {});
    } catch (e) {}

    return { success: true, article: formattedArticle };
  };

  const updateArticle = async (id, updatedFields) => {
    const keyTakeaways = Array.isArray(updatedFields.keyTakeaways)
      ? updatedFields.keyTakeaways
      : typeof updatedFields.keyTakeaways === 'string'
      ? updatedFields.keyTakeaways.split('\n').map(t => t.trim()).filter(Boolean)
      : updatedFields.keyTakeaways;

    const slug =
      updatedFields.slug ||
      (updatedFields.title
        ? updatedFields.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : updatedFields.slug);

    const formatted = {
      ...updatedFields,
      slug,
      keyTakeaways
    };

    // 1. Immediately update UI state
    setArticles((prev) =>
      prev.map((a) =>
        String(a.id) === String(id) || String(a.slug) === String(id)
          ? { ...a, ...formatted }
          : a
      )
    );

    // 2. Sync with backend API
    try {
      fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(formatted)
      }).catch(() => {});
    } catch (e) {}

    return { success: true, article: formatted };
  };

  const deleteArticle = async (id) => {
    // 1. Immediately update UI state
    setArticles((prev) =>
      prev.filter((a) => String(a.id) !== String(id) && String(a.slug) !== String(id))
    );

    // 2. Sync with backend API
    try {
      fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      }).catch(() => {});
    } catch (e) {}

    return { success: true };
  };

  // Reset to initial seed data
  const resetToDefaults = async () => {
    setProjects(initialProjects);
    setArticles(initialArticles);
    try {
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
      localStorage.removeItem(STORAGE_KEY_ARTICLES);
      fetch('/api/admin/import', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ projects: initialProjects, articles: initialArticles })
      }).catch(() => {});
    } catch (e) {}
  };

  // Export full JSON
  const exportData = () => {
    const data = {
      projects,
      articles,
      exportedAt: new Date().toISOString()
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `portfolio_data_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const importData = async (jsonData) => {
    try {
      if (jsonData.projects && Array.isArray(jsonData.projects)) {
        setProjects(jsonData.projects);
      }
      if (jsonData.articles && Array.isArray(jsonData.articles)) {
        setArticles(jsonData.articles);
      }
      try {
        fetch('/api/admin/import', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(jsonData)
        }).catch(() => {});
      } catch (e) {}
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        articles,
        loading,
        isAuthenticated: Boolean(token),
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
        importData,
        refreshData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
