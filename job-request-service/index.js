const express = require('express');
const cors = require('cors');
const app = express();
const jobRequestRoutes = require('./routes/jobRequest.route');


app.use(cors()); 
app.use(express.json());

// Routes
app.use('/job-request', jobRequestRoutes);


app.get('/', (req, res) => {
  res.send('Job Request Service Running...');
});

// Start server
const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
