import { PostModel } from '../models/post.model.js';
import { UserModel } from '../models/user.model.js';
import { ErrorResponse } from '../middleware/error.middleware.js';

export const getAllPosts = async () => {
    // Populate author details (username) from the User collection
    const posts = await PostModel.find().sort({ createdAt: -1 }); // Newest first

    // We need to fetch author names manually or use populate if we set up refs correctly.
    // Since we set ref: 'User' in the schema, let's use populate if possible, or manual map.
    // For simplicity/robustness without complex population logic matching the previous array structure:

    // Let's do a manual enrichment like before to be safe with the response structure expectations
    // Or better, use Mongoose populate
    // const enrichedPosts = await PostModel.find().sort({ createdAt: -1 }).populate('authorId', 'username');
    // But then the field would be 'authorId: { _id, username }'.
    // The frontend expects 'authorName'.

    const enrichedPosts = await Promise.all(posts.map(async (post) => {
        const user = await UserModel.findById(post.authorId);
        return {
            ...post.toObject(),
            id: post._id,
            authorName: user ? user.username : 'Unknown'
        };
    }));

    return enrichedPosts;
};

export const getPostById = async (id) => {
    const post = await PostModel.findById(id);
    if (!post) throw new ErrorResponse('Post not found', 404);

    const user = await UserModel.findById(post.authorId);
    return {
        ...post.toObject(),
        id: post._id,
        authorName: user ? user.username : 'Unknown'
    };
};

export const createPost = async (userId, { title, desc, img }) => {
    const post = await PostModel.create({
        title,
        desc,
        img: img || '',
        authorId: userId
    });
    return post;
};

export const updatePost = async (id, userId, updates) => {
    const post = await PostModel.findById(id);
    if (!post) throw new ErrorResponse('Post not found', 404);

    if (post.authorId.toString() !== userId) {
        throw new ErrorResponse('Not authorized to update this post', 403);
    }

    const updatedPost = await PostModel.findByIdAndUpdate(id, updates, { new: true });
    return updatedPost;
};

export const deletePost = async (id, userId) => {
    const post = await PostModel.findById(id);
    if (!post) throw new ErrorResponse('Post not found', 404);

    if (post.authorId.toString() !== userId) {
        throw new ErrorResponse('Not authorized to delete this post', 403);
    }

    await PostModel.findByIdAndDelete(id);
    return true;
};
