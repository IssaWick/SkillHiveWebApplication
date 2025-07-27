const express = require('express');
const app = express();
const db = require('./config/db');
const jobRequestRoutes = require('./routes/jobRequest.route');

app.use(express.json());


app.use('/job-request', jobRequestRoutes);

app.get('/', (req, res) => {
  res.send('Job Request Service Running...');
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
