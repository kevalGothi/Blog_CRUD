import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { LocalStorage } from "node-localstorage";

let localStorage = new LocalStorage("./scratch");
let commentsRouter = Router();

// Helper to get comments
const getComments = () => {
    try {
        const commentsStr = localStorage.getItem("comments");
        return commentsStr ? JSON.parse(commentsStr) : [];
    } catch (err) {
        return [];
    }
};

// Helper to save comments
const saveComments = (comments) => {
    localStorage.setItem("comments", JSON.stringify(comments, null, 2));
};

// Get comments for a post
commentsRouter.get("/posts/:postId/comments", (req, res) => {
    const { postId } = req.params;
    const allComments = getComments();
    const postComments = allComments.filter((c) => c.postId === postId);
    // Sort by newest first
    postComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(postComments);
});

// Add a comment
// Note: authMiddleware should be used before this route to populate req.user
commentsRouter.post("/posts/:postId/comments", (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!text || text.trim() === "") {
        return res.status(400).json({ message: "Comment text is required" });
    }

    const newComment = {
        id: uuidv4(),
        text,
        authorName: req.user.username, // Using username as per existing auth pattern
        postId,
        createdAt: new Date().toISOString(),
    };

    const comments = getComments();
    comments.push(newComment);
    saveComments(comments);

    res.status(201).json(newComment);
});

export default commentsRouter;
