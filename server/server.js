const express = require('express');
const app = express();
const db = require('./database/database.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());
app.use(express.static('public'));

// User registration
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const params = [username, hash];
        db.run(sql, params, function (err, result) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({
                message: 'success',
                data: { id: this.lastID }
            });
        });
    });
});

// User login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    const params = [username];
    db.get(sql, params, (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }
        bcrypt.compare(password, row.password, (err, result) => {
            if (result) {
                // Passwords match
                // Create session, JWT, etc. here
                res.json({ message: 'success' });
            } else {
                // Passwords don't match
                res.status(401).json({ error: 'Incorrect password' });
            }
        });
    });
});

// Get all sections
app.get('/api/sections', (req, res) => {
    const sql = 'SELECT * FROM sections';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Add a new section
app.post('/api/sections', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO sections (name) VALUES (?)';
    const params = [name];
    db.run(sql, params, function (err, result) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'success',
            data: { id: this.lastID }
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
