import express from 'express';
import * as postController from '../controllers/post.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);

router.post('/', protect, postController.createPost);
router.put('/:id', protect, postController.updatePost);
router.delete('/:id', protect, postController.deletePost);

export default router;
