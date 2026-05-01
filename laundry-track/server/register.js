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

// POST route for registration
app.post('/register', (req, res) => {
    const { fullName, email, password } = req.body;

    // Basic validation (you can add more like email format, password strength)
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Here you would typically save to a database
    // For now, just log and respond with the received data
    console.log('New registration:', { fullName, email, password });

    // Respond with the received data
    res.status(200).json({
        message: 'Registration successful',
        data: { fullName, email, password }
    });
});

// Simple JSON endpoint for the React client to fetch during development
app.get('/test', (req, res) => {
    res.json({ name: 'hello this is test API' });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});