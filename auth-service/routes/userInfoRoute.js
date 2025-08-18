import express from 'express';
import { getUserInfo, getUserInfoById } from '../controllers/userInfoController.js';

const router = express.Router();


router.get('/user-info', getUserInfo);


router.get('/user-info/:id', getUserInfoById);

export default router;
