import express from 'express';
import * as commentController from '../controllers/comment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router({ mergeParams: true });

// Routes mapped to /api/posts/:postId/comments
router.get('/', commentController.getComments);
router.post('/', protect, commentController.createComment);

export default router;
