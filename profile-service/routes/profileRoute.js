import express from 'express';
import { getProfile } from '../controllers/profileController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/getProfile', verifyToken, getProfile);

export default router;
