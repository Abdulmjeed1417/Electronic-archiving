const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./server/database/archive.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the archive database.');
});

db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        is_admin BOOLEAN DEFAULT 0,
        is_active BOOLEAN DEFAULT 1
    )`);

    // Sections table
    db.run(`CREATE TABLE IF NOT EXISTS sections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
    )`);

    // Files table
    db.run(`CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        path TEXT,
        section_id INTEGER,
        upload_year INTEGER,
        FOREIGN KEY (section_id) REFERENCES sections (id)
    )`);

    // Settings table
    db.run(`CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        font_size TEXT DEFAULT 'medium',
        language TEXT DEFAULT 'ar',
        theme TEXT DEFAULT 'light',
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // Login history table
    db.run(`CREATE TABLE IF NOT EXISTS login_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
});

module.exports = db;
