import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from "url";
import cors from 'cors';

const __dirname = dirname(fileURLToPath(
    import.meta.url));

const app = express();
const port = 3000;
const corOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
}

app.use(bodyParser.json({ extended: true }));
app.use(cors(corOptions));



// Simple JSON endpoint for the React client to fetch during development
app.get('/', (req, res) => {
    res.render('landingPage.jsx')
});

app.get('/home', (req, res) => {
    res.render('home.jsx')
});

app.get('/register', (req, res) => {
    res.render('register.jsx')
});

app.get('/login', (req, res) => {
    res.render('login.jsx')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});