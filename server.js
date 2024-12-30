const express = require('express');
const { PrismaClient } = require('@prisma/client');
const mysql = require('mysql2');

const app = express();
const prisma = new PrismaClient();

// Get DB connection settings from environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'testdb'
};

// Create the database connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Middleware to handle JSON requests
app.use(express.json());

// Endpoint to fetch posts from the database using Prisma
app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json({ status: 'true', data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch posts' });
  }
});

// Simple root endpoint
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
