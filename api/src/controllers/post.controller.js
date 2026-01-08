import * as postService from '../services/post.service.js';

export const getPosts = async (req, res, next) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        next(error);
    }
};

export const getPost = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        next(error);
    }
};

export const createPost = async (req, res, next) => {
    try {
        const { title, desc, img } = req.body;
        if (!title || !desc) {
            return res.status(400).json({ success: false, error: 'Title and Description are required' });
        }

        const post = await postService.createPost(req.user.id, { title, desc, img });
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        next(error);
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const post = await postService.updatePost(req.params.id, req.user.id, req.body);
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        next(error);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        await postService.deletePost(req.params.id, req.user.id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};
