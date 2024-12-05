const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');
const app = express();
var nodemailer = require('nodemailer');
// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));




app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '', // Your Gmail address
            pass: '', // Replace with your App Password
        },
        tls: {
            rejectUnauthorized: false, // Ignore self-signed certificate errors
        },
    });

    const composemail = {
        from: '',
        to: to,
        subject: subject,
        text:text,
    };

    sender.sendMail(composemail, (error, info) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Failed to send email', error: error.message });
        } else {
            console.log('Mail sent successfully: ' + info.response);
            
            return res.status(200).json({ message: 'Mail sent successfully!' });
        }
    });
   
});
// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home.html'));  // Serve home.html at root
});

// Serve the Sign-Up Page
app.get('/stud-signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stud-signup.html')); // Serve the Sign-Up page
});

// Serve the Login Page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stud-signup.html')); // Serve the Login page (update file path if needed)
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dash.html'));
});

app.get('/alum-prof', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'alum-prof.html')); // Replace 'alum-prof.html' with the correct file name
});

app.get('/sched', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sched.html'));  // Corrected path to sched.html
});

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',      // Replace with your MySQL host
    user: 'root',           // Replace with your MySQL username
    password: 'root',       // Replace with your MySQL password
    database: 'user_auth',  // Replace with your database name
    port: 3306              // Default MySQL port
});

// Test Database Connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Email already registered' });
                }
                return res.status(500).json({ message: 'Database error', error: err });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Error hashing password', error: err });
    }
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            // Send success message and indicate successful login
            res.status(200).json({ message: 'Login successful', redirectTo: '/dashboard' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Start the Server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
