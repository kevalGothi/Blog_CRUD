import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    desc: {
        type: String,
        required: [true, 'Please add a description'],
    },
    img: {
        type: String,
        default: '',
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

postSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

postSchema.set('toJSON', {
    virtuals: true
});

export const PostModel = mongoose.model('Post', postSchema);
