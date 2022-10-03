import { Router } from 'express';
import postCtrl from '../controller/postCtrl.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.route('/posts')
.post(auth, postCtrl.createPost)


router.get('/postall',auth, postCtrl.getPosts)

router.get('/posts/:id',auth, postCtrl.getPost)

router.route('/post/:id')
.patch(auth, postCtrl.updatePost)
// .get(auth, postCtrl.getSinglePost)
.delete(auth,postCtrl.deletePost)

router.patch('/post/:id/like',auth, postCtrl.likePost)
router.patch('/post/:id/unlike',auth, postCtrl.unlikePost)


export default router;