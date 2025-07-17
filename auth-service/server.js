import express from 'express';
import dotenv from 'dotenv';
import signupRoute from './routes/signupRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api', signupRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
