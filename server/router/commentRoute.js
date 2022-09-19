import { Router } from 'express';
import commentCtrl from '../controller/commentCtrl.js';
import { auth } from '../middleware/auth.js';


const router = Router();

router.post('/comment',auth, commentCtrl.createComment)
 router.patch('/comment/:id', auth, commentCtrl.updateComment)
 router.patch('/comment/:id/like',auth, commentCtrl.likeComment)
router.patch('/comment/:id/unlike',auth, commentCtrl.unlikeComment)
// router.delete('/comment/:id', auth, commentCtrl.deleteComment)

export default router;