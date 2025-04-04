const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        content: { type: String, required: true },
        post: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' },
    },
    { timestamps: true }

);


module.exports = mongoose.model('Comment', commentSchema);