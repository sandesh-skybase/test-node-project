const express = require('express');

const app = express();

// Simple route to check server status
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
