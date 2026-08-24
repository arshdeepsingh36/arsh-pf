import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialProjects, initialArticles } from '../data/initialData';

const DataContext = createContext(null);

const TOKEN_KEY = 'cms_session_token_v1';

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [articles, setArticles] = useState(initialArticles);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem(TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });

  // Fetch live public data from backend API
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const [projRes, artRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/articles')
      ]);

      if (projRes.ok) {
        const projData = await projRes.json();
        if (Array.isArray(projData) && projData.length > 0) {
          setProjects(projData);
        }
      }

      if (artRes.ok) {
        const artData = await artRes.json();
        if (Array.isArray(artData) && artData.length > 0) {
          setArticles(artData);
        }
      }
    } catch (err) {
      console.warn('API server not reachable, using seed data:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Login handler (verifies password on backend)
  const login = async (password) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Authentication failed' };
      }

      setToken(data.token);
      try {
        sessionStorage.setItem(TOKEN_KEY, data.token);
      } catch (e) {
        console.error('Failed to store session token', e);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Cannot connect to backend security server.' };
    }
  };

  // Logout handler
  const logout = () => {
    setToken(null);
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (e) {}
  };

  // Authenticated headers helper
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  });

  // Project Mutations
  const addProject = async (newProject) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newProject)
      });
      if (res.ok) {
        const saved = await res.json();
        setProjects((prev) => [saved, ...prev]);
        return { success: true, project: saved };
      } else {
        const err = await res.json();
        return { success: false, error: err.error || 'Failed to add project' };
      }
    } catch (e) {
      // Optimistic fallback
      const fallback = { ...newProject, id: String(Date.now()) };
      setProjects((prev) => [fallback, ...prev]);
      return { success: true, project: fallback };
    }
  };

  const updateProject = async (id, updatedFields) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects((prev) => prev.map((p) => (String(p.id) === String(id) ? updated : p)));
        return { success: true, project: updated };
      } else {
        const err = await res.json();
        return { success: false, error: err.error || 'Failed to update project' };
      }
    } catch (e) {
      setProjects((prev) => prev.map((p) => (String(p.id) === String(id) ? { ...p, ...updatedFields } : p)));
      return { success: true };
    }
  };

  const deleteProject = async (id) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));
        return { success: true };
      }
    } catch (e) {
      setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));
      return { success: true };
    }
  };

  // Article Mutations
  const addArticle = async (newArticle) => {
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newArticle)
      });
      if (res.ok) {
        const saved = await res.json();
        setArticles((prev) => [saved, ...prev]);
        return { success: true, article: saved };
      } else {
        const err = await res.json();
        return { success: false, error: err.error || 'Failed to add article' };
      }
    } catch (e) {
      const fallback = { ...newArticle, id: String(Date.now()) };
      setArticles((prev) => [fallback, ...prev]);
      return { success: true, article: fallback };
    }
  };

  const updateArticle = async (id, updatedFields) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });
      if (res.ok) {
        const updated = await res.json();
        setArticles((prev) =>
          prev.map((a) => (String(a.id) === String(id) || String(a.slug) === String(id) ? updated : a))
        );
        return { success: true, article: updated };
      } else {
        const err = await res.json();
        return { success: false, error: err.error || 'Failed to update article' };
      }
    } catch (e) {
      setArticles((prev) =>
        prev.map((a) => (String(a.id) === String(id) || String(a.slug) === String(id) ? { ...a, ...updatedFields } : a))
      );
      return { success: true };
    }
  };

  const deleteArticle = async (id) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => String(a.id) !== String(id) && String(a.slug) !== String(id)));
        return { success: true };
      }
    } catch (e) {
      setArticles((prev) => prev.filter((a) => String(a.id) !== String(id) && String(a.slug) !== String(id)));
      return { success: true };
    }
  };

  // Reset to defaults
  const resetToDefaults = async () => {
    try {
      await fetch('/api/admin/import', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ projects: initialProjects, articles: initialArticles })
      });
    } catch (e) {}
    setProjects(initialProjects);
    setArticles(initialArticles);
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

  // Import JSON to backend
  const importData = async (jsonData) => {
    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(jsonData)
      });
      if (res.ok) {
        if (jsonData.projects) setProjects(jsonData.projects);
        if (jsonData.articles) setArticles(jsonData.articles);
        return { success: true };
      } else {
        const err = await res.json();
        return { success: false, error: err.error };
      }
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
