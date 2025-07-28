import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import signupRoute from './routes/signupRoute.js';
import loginRoute from './routes/loginRoute.js';
import userInfoRoute from './routes/userInfoRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api', signupRoute);
app.use('/api', loginRoute);
app.use('/api', userInfoRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

