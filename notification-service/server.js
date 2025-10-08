// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import notificationRoutes from './routes/notificationRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors({
  origin: "http://localhost:4000",
  credentials: true
}));

app.use(express.json());

// Notification routes
app.use("/api/notifications", notificationRoutes);

app.listen(PORT, () => {
  console.log(`✅ Notification Service running on port ${PORT}`);
});
