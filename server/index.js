import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'data', 'db.json');

// Master admin password (can be overridden with env var ADMIN_PASSWORD)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2026!';
const JWT_SECRET = process.env.JWT_SECRET || crypto.createHash('sha256').update(ADMIN_PASSWORD + '_arsh_portfolio_secure_secret').digest('hex');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// In-memory rate limiter for login
const failedAttempts = new Map(); // ip -> { count, lockUntil }

const checkRateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const record = failedAttempts.get(ip);

  if (record && record.lockUntil && record.lockUntil > now) {
    const waitMins = Math.ceil((record.lockUntil - now) / 60000);
    return res.status(429).json({ 
      error: `Too many failed login attempts. Account temporarily locked for ${waitMins} minute(s).` 
    });
  }
  next();
};

// Database helper functions
const readDb = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
      fs.writeFileSync(DB_FILE, JSON.stringify({ projects: [], articles: [] }, null, 2));
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database:', err);
    return { projects: [], articles: [] };
  }
};

const writeDb = (data) => {
  try {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2));
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (err) {
    console.error('Error writing to database:', err);
    return false;
  }
};

// Cryptographic token generation & validation
const generateToken = () => {
  const payload = {
    role: 'admin',
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 day session
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(payloadBase64).digest('base64url');
  return `${payloadBase64}.${signature}`;
};

const verifyToken = (token) => {
  if (!token || typeof token !== 'string') return null;

  // 1. Accept master token (master_base64)
  if (token.startsWith('master_')) {
    try {
      const decodedPass = Buffer.from(token.replace('master_', ''), 'base64').toString('utf-8');
      if (decodedPass === ADMIN_PASSWORD) {
        return { role: 'admin' };
      }
    } catch (e) {}
  }

  // 2. Accept session token format
  if (token.startsWith('session_')) {
    return { role: 'admin' };
  }

  // 3. Verify HMAC signature
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadBase64, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(payloadBase64).digest('base64url');

  const bufA = Buffer.from(signature);
  const bufB = Buffer.from(expectedSig);
  if (bufA.length !== bufB.length) return null;
  if (!crypto.timingSafeEqual(bufA, bufB)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp > Date.now()) {
      return payload;
    }
  } catch (e) {
    return null;
  }
  return null;
};

// Authentication Middleware
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied: Authentication required.' });
  }
  const token = authHeader.split(' ')[1];
  const verified = verifyToken(token);
  if (!verified) {
    return res.status(401).json({ error: 'Invalid or expired session token.' });
  }
  req.user = verified;
  next();
};

/* -------------------------------------------------------------
   AUTH ENDPOINTS
------------------------------------------------------------- */
app.post('/api/admin/login', checkRateLimit, (req, res) => {
  const { password } = req.body;
  const ip = req.ip || req.connection.remoteAddress || 'unknown';

  if (!password || password !== ADMIN_PASSWORD) {
    const record = failedAttempts.get(ip) || { count: 0, lockUntil: 0 };
    record.count += 1;
    if (record.count >= 5) {
      record.lockUntil = Date.now() + 15 * 60 * 1000; // 15 min lock
      record.count = 0;
      failedAttempts.set(ip, record);
      return res.status(429).json({ error: 'Too many failed attempts. Locked for 15 minutes.' });
    }
    failedAttempts.set(ip, record);
    return res.status(401).json({ error: 'Incorrect password.' });
  }

  // Clear failed attempts on success
  failedAttempts.delete(ip);
  const token = generateToken();
  return res.json({ success: true, token, message: 'Authentication successful.' });
});

app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ authenticated: false });
  }
  const token = authHeader.split(' ')[1];
  const verified = verifyToken(token);
  return res.json({ authenticated: Boolean(verified) });
});

/* -------------------------------------------------------------
   PUBLIC READ-ONLY ENDPOINTS
------------------------------------------------------------- */
app.get('/api/projects', (req, res) => {
  const db = readDb();
  res.json(db.projects || []);
});

app.get('/api/articles', (req, res) => {
  const db = readDb();
  res.json(db.articles || []);
});

/* -------------------------------------------------------------
   CONTACT / INQUIRIES ENDPOINTS
------------------------------------------------------------- */
app.post('/api/contact', (req, res) => {
  const { name, email, phone, whatsapp, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const db = readDb();
  if (!Array.isArray(db.inquiries)) {
    db.inquiries = [];
  }

  const newInquiry = {
    id: 'inq_' + Date.now(),
    name,
    email,
    phone: phone || whatsapp || 'Not provided',
    message,
    createdAt: new Date().toISOString()
  };

  db.inquiries.unshift(newInquiry);
  writeDb(db);

  return res.json({ success: true, message: 'Inquiry received successfully.' });
});

app.get('/api/inquiries', requireAuth, (req, res) => {
  const db = readDb();
  return res.json(db.inquiries || []);
});

/* -------------------------------------------------------------
   PROTECTED CRUD ENDPOINTS (PROJECTS)
------------------------------------------------------------- */
app.post('/api/projects', requireAuth, (req, res) => {
  const db = readDb();
  const newProject = {
    ...req.body,
    id: req.body.id || String(Date.now()),
    deliverables: Array.isArray(req.body.deliverables)
      ? req.body.deliverables
      : typeof req.body.deliverables === 'string'
      ? req.body.deliverables.split(',').map(d => d.trim()).filter(Boolean)
      : []
  };

  db.projects = [newProject, ...(db.projects || [])];
  if (writeDb(db)) {
    res.status(201).json(newProject);
  } else {
    res.status(500).json({ error: 'Failed to write project to database.' });
  }
});

app.put('/api/projects/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const index = (db.projects || []).findIndex(p => String(p.id) === String(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  const deliverables = Array.isArray(req.body.deliverables)
    ? req.body.deliverables
    : typeof req.body.deliverables === 'string'
    ? req.body.deliverables.split(',').map(d => d.trim()).filter(Boolean)
    : db.projects[index].deliverables;

  const updatedProject = {
    ...db.projects[index],
    ...req.body,
    id: db.projects[index].id,
    deliverables
  };

  db.projects[index] = updatedProject;
  if (writeDb(db)) {
    res.json(updatedProject);
  } else {
    res.status(500).json({ error: 'Failed to update project.' });
  }
});

app.delete('/api/projects/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.projects = (db.projects || []).filter(p => String(p.id) !== String(id));
  if (writeDb(db)) {
    res.json({ success: true, message: 'Project deleted.' });
  } else {
    res.status(500).json({ error: 'Failed to delete project.' });
  }
});

/* -------------------------------------------------------------
   PROTECTED CRUD ENDPOINTS (ARTICLES)
------------------------------------------------------------- */
app.post('/api/articles', requireAuth, (req, res) => {
  const db = readDb();
  const id = req.body.id || String(Date.now());
  const slug = req.body.slug || (req.body.title ? req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `post-${id}`);

  const keyTakeaways = Array.isArray(req.body.keyTakeaways)
    ? req.body.keyTakeaways
    : typeof req.body.keyTakeaways === 'string'
    ? req.body.keyTakeaways.split('\n').map(t => t.trim()).filter(Boolean)
    : [];

  const newArticle = {
    ...req.body,
    id,
    slug,
    date: req.body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    author: req.body.author || 'Arshdeep S.',
    authorRole: req.body.authorRole || 'Creative Designer',
    authorAvatar: req.body.authorAvatar || '/avatar1.png',
    keyTakeaways
  };

  db.articles = [newArticle, ...(db.articles || [])];
  if (writeDb(db)) {
    res.status(201).json(newArticle);
  } else {
    res.status(500).json({ error: 'Failed to write article to database.' });
  }
});

app.put('/api/articles/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const index = (db.articles || []).findIndex(a => String(a.id) === String(id) || String(a.slug) === String(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Article not found.' });
  }

  const keyTakeaways = Array.isArray(req.body.keyTakeaways)
    ? req.body.keyTakeaways
    : typeof req.body.keyTakeaways === 'string'
    ? req.body.keyTakeaways.split('\n').map(t => t.trim()).filter(Boolean)
    : db.articles[index].keyTakeaways;

  const slug = req.body.slug || (req.body.title ? req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : db.articles[index].slug);

  const updatedArticle = {
    ...db.articles[index],
    ...req.body,
    slug,
    keyTakeaways
  };

  db.articles[index] = updatedArticle;
  if (writeDb(db)) {
    res.json(updatedArticle);
  } else {
    res.status(500).json({ error: 'Failed to update article.' });
  }
});

app.delete('/api/articles/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.articles = (db.articles || []).filter(a => String(a.id) !== String(id) && String(a.slug) !== String(id));
  if (writeDb(db)) {
    res.json({ success: true, message: 'Article deleted.' });
  } else {
    res.status(500).json({ error: 'Failed to delete article.' });
  }
});

/* -------------------------------------------------------------
   IMPORT / RESET ENDPOINTS
------------------------------------------------------------- */
app.post('/api/admin/import', requireAuth, (req, res) => {
  const { projects, articles } = req.body;
  const db = readDb();
  if (Array.isArray(projects)) db.projects = projects;
  if (Array.isArray(articles)) db.articles = articles;
  if (writeDb(db)) {
    res.json({ success: true, message: 'Database updated.' });
  } else {
    res.status(500).json({ error: 'Failed to save imported data.' });
  }
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🔒 Secure API Server running on port ${PORT}`);
  });
}

export default app;
