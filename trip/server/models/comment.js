const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        author: [{ type: mongoose.Types.ObjectId, retuired: true, ref: 'User' }],
        title: { type: String, required: true },
        content: { type: String, required: true },
        post: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
    },
    { timestamps: true }

);


module.exports = mongoose.Schema('Comment', commentSchema);