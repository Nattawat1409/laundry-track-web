import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

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
const users = new Map();

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

app.post('/register', (req, res) => {
    const { fullName, email, password } = req.body || {};
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    if (users.has(email)) {
        return res.status(409).json({ message: 'Email already registered' });
    }
    const { salt, hash } = hashPassword(password);
    const user = {
        id: Date.now().toString(),
        fullName,
        email,
        salt,
        hash,
        createdAt: new Date().toISOString(),
    };
    users.set(email, user);
    req.session.userId = user.id;
    req.session.email = email;
    res.status(201).json({ user: publicUser(user) });
});

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
    const user = [...users.values()].find((u) => u.id === req.session.userId);
    if (!user) {
        req.session.destroy(() => {});
        return res.status(401).json({ message: 'Not authenticated' });
    }
    res.json({ user: publicUser(user) });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});