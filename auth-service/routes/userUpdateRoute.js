import express from 'express';
import { userUpdate } from '../controllers/userUpdateController.js';

const router = express.Router();

router.put('/user-update', userUpdate);

export default router;
