import { Router } from 'express';
import postCtrl from '../controller/postCtrl.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.route('/posts')
.post(auth, postCtrl.createPost)
.get( auth, postCtrl.getPost)

router.get('/postall',auth, postCtrl.getPosts)

router.route('/post/:id')
.patch(auth, postCtrl.updatePost)
.get(auth, postCtrl.getSinglePost)
.delete(auth,postCtrl.deletePost)

router.patch('/post/:id/like',auth, postCtrl.likePost)
router.patch('/post/:id/unlike',auth, postCtrl.unlikePost)
router.get('/userposts/:id',auth,postCtrl.getUserPosts)
router.patch('/save/:id',auth,postCtrl.savePost)
router.patch('/unsave/:id',auth,postCtrl.unsavePost)
router.get('/savedpost',auth,postCtrl.getsavedPost)

export default router;