const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jwt');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'studentmanagement'
});

db.connect(err => {
    console.log('Database connected')
});

app.listen(port, () => {
    console.log(`Sever running on port ${port}`);
});

function generate2FACode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

function send2FACode(email, code) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your 2FA Code',
    text: `Your 2FA code is: ${code}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

app.post('/api/send-2fa-code', (req, res) => {
    const { email } = req.body;
  
    const code = generate2FACode();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);
    const query = 'UPDATE users SET two_factor_code = ?, two_factor_expires = ? WHERE email = ?';
    db.query(query, [code, expiry, email], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
  
      send2FACode(email, code);
      res.status(200).json({ message: '2FA code sent successfully' });
    });
  });

  app.post('/api/validate-2fa', (req, res) => {
    const { email, code } = req.body;
  
    const query = 'SELECT two_factor_code, two_factor_expires FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
  
      if (results.length === 0) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      const user = results[0];
      if (user.two_factor_code !== code || new Date(user.two_factor_expires) < new Date()) {
        return res.status(400).json({ error: 'Invalid or expired 2FA code' });
      }
  
      res.status(200).json({ message: '2FA code validated successfully' });
    });
  });
  
  

// Registration Endpoint

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
  
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
  
      if (results.length === 0) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      const user = results[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
      }
  
      const code = generate2FACode();
      const expiry = new Date(Date.now() + 10 * 60 * 1000);
  
      const updateQuery = 'UPDATE users SET two_factor_code = ?, two_factor_expires = ? WHERE email = ?';
      db.query(updateQuery, [code, expiry, email], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
  
        send2FACode(email, code);
        res.status(200).json({ message: '2FA code sent, please verify', userId: user.id });
      });
    });
  });
  

//Profile Endpoint

app.get('/api/profile', authenticateToken, (req, res) => {
    const userId = req.user.id;
  
    const query = 'SELECT id, email, name, created_at FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = results[0];
      res.status(200).json({ user });
    });
  });