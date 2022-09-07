import {Router} from 'express';
import authCtrl from '../controller/authCtrl.js';


const router = Router();

router.post('/register',authCtrl.register);

router.post('/login',authCtrl.login);

router.post('/logout',authCtrl.logout);

router.post('/refresh_token',authCtrl.generateAccessToken);

export default router;