import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { userCtrl } from '../controller/userCtrl.js';

const router = Router();

router.get('/search', auth, userCtrl.searchUser)



export default router;