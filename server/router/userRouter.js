import {Router} from 'express';
import userCtrl from '../controller/userCtrl.js';
import auth from '../middleware/auth'

const router = Router();

router.get('/search',auth, userCtrl.searchUser)

export default router;
