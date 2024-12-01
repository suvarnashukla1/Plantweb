const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'suvarna',  
  database: 'plantdb',
  port: 3306
});
db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
});

const JWT_SECRET = 'mymymy'; 

const generateToken = (user) => jwt.sign({ id: user.id, userName: user.userName }, JWT_SECRET, { expiresIn: '2h' });

app.post('/register', async (req, res) => {
  const { email, userName, password } = req.body;

  if (!email || !userName || !password) return res.status(400).send({ error: 'All fields are required' });

  db.query('SELECT * FROM username WHERE username = ?', [userName], async (err, results) => {
    if (err) return res.status(500).send({ error: 'Database error', details: err.message });
    if (results.length > 0) return res.status(400).send({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO username (email, username, password) VALUES (?, ?, ?)', [email, userName, hashedPassword], (err, results) => {
      if (err) return res.status(500).send({ error: 'Database error', details: err.message });
      
      const user = { id: results.insertId, userName };
      const token = generateToken(user);
      res.status(201).send({ message: 'User registered successfully', token });
    });
  });
});

app.post('/login', (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) return res.status(400).send({ error: 'Both username and password are required' });

  db.query('SELECT * FROM username WHERE username = ?', [userName], async (err, results) => {
    if (err) return res.status(500).send({ error: 'Database error', details: err.message });
    if (results.length === 0) return res.status(404).send({ error: 'User not found' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ error: 'Invalid username or password' });

    const token = generateToken(user);
    res.status(200).send({ message: 'Login successful', token });
  });
});

// Protected route
app.get('/dashboard', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send({ error: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).send({ error: 'Invalid or expired token.' });
    res.status(200).send(`<h1>Welcome, ${decoded.userName}</h1>`);
  });
});

// Start server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
