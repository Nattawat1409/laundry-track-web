import 'dotenv/config';
import pool from './db.js';

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { Result } from 'pg';

const app = express();
const port = 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'lax',
        secure: false,
        httpOnly: true,
    },
}));

// In-memory user store. Replace with a real DB before production.
// Shape: email -> { id, fullName, email, salt, hash, createdAt }

const hashPassword = (password) => {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return { salt, hash };
};

const verifyPassword = (password, salt, expectedHash) => {
    const candidate = scryptSync(password, salt, 64);
    const expected = Buffer.from(expectedHash, 'hex');
    if (candidate.length !== expected.length) return false;
    return timingSafeEqual(candidate, expected);
};

const publicUser = (u) => ({ id: u.id, fullName: u.fullName, email: u.email });

const requireAuth = (req, res, next) => {
    if (!req.session?.userId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};

app.get('/', (req, res) => {
    res.json({ status: 'API is working!' });
});

app.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body || {}

  // 1. Validate input
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  try {
    // 2. Check if email already exists in DB
    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    // 3. Hash password (same as before)
    const { salt, hash } = hashPassword(password)

    // 4. Insert new user into DB
    const result = await pool.query(
      `INSERT INTO users (full_name, email, salt, hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email`,
      [fullName, email, salt, hash]
    )

    const user = result.rows[0]

    // 5. Save to session (same as before)
    req.session.userId = user.id
    req.session.email = user.email

    res.status(201).json({
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email
      }
    })

  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/login', (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = users.get(email);
    if (!user || !verifyPassword(password, user.salt, user.hash)) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    req.session.userId = user.id;
    req.session.email = email;
    res.json({ user: publicUser(user) });
});

app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({ ok: true });
    });
});

app.get('/me', requireAuth, (req, res) => {
    res.json({ user: publicUser(user) });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});