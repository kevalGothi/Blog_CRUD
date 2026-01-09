import { CommentModel } from '../models/comment.model.js';
import { ErrorResponse } from '../middleware/error.middleware.js';
import { UserModel } from '../models/user.model.js';

export const getComments = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comments = await CommentModel.find({ post: postId })
            .populate('author', 'username') // Populate author name
            .sort({ createdAt: -1 });

        // Transform for frontend (authorName expectation)
        const transformedComments = comments.map(c => ({
            id: c._id,
            text: c.text,
            authorName: c.author ? c.author.username : 'Unknown',
            createdAt: c.createdAt
        }));

        res.status(200).json(transformedComments);
    } catch (err) {
        next(err);
    }
};

export const createComment = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;

        if (!text) {
            return next(new ErrorResponse('Please provide comment text', 400));
        }

        const comment = await CommentModel.create({
            text,
            post: postId,
            author: req.user._id
        });

        // Populate for response
        await comment.populate('author', 'username');

        const transformedComment = {
            id: comment._id,
            text: comment.text,
            authorName: comment.author.username,
            createdAt: comment.createdAt
        };

        res.status(201).json(transformedComment);
    } catch (err) {
        next(err);
    }
};
