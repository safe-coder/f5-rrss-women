import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import  userCtrl from '../controller/userCtrl.js';

const router = Router();

router.get('/search', userCtrl.searchUser)
router.get('/user/:id',auth, userCtrl.getUser)



export default router;