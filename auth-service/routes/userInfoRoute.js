import express from 'express';
import { getUserInfo } from '../controllers/userInfoController.js';

const router = express.Router();

router.get('/user-info', getUserInfo);

export default router;
