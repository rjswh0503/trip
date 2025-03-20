const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        author: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User'}],
        title: { type: String, required: true},
        content: { type: String, required: true},
        image: { type: String, required: true},
        likes: { type: Number, default: 0},
        comments : [{ type: mongoose.Types.ObjectId, ref: 'Comment'}],
    },
    { timestamps: true},
)



module.exports = mongoose.Schema('Post', postSchema);