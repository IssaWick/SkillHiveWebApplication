// index.js
const express = require('express');
const app = express();
const PORT = 3004;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Job Request Service Running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
