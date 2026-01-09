import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Please add a comment text'],
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // Cache author name to avoid extra lookups if desired, 
        // but populating is cleaner. We'll populate.
    },
    {
        timestamps: true,
    }
);

export const CommentModel = mongoose.model('Comment', commentSchema);
