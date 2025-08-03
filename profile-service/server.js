import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import profileRoutes from './routes/profileRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api', profileRoutes);

app.listen(PORT, () => {
  console.log(`Profile Service running on port ${PORT}`);
});
