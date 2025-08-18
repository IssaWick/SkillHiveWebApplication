const cors = require('cors');
const express = require('express');

const app = express();
const matchingRoutes = require('./routes/matching.route');

// Middleware
app.use(cors());         // ✅ Enable CORS
app.use(express.json()); // Parse JSON

// Routes
app.use('/matching', matchingRoutes);

app.get('/', (req, res) => {
  res.send('Matching Service Running...');
});

// Start server
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
