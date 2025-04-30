const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       
  password: '',      
  database: 'earist', 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// API endpoint to fetch COR data
app.get('/api/certificates', (req, res) => {
  const query = 'SELECT * FROM certificate_of_registration';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});