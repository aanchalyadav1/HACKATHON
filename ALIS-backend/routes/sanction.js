import express from 'express';
import { sanctionController } from '../controllers/sanctionController.js';
const router = express.Router();

router.post('/', sanctionController);

export default router;
