const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        author: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
        title: { type: String, required: true},
        content: { type: String, required: true},
        images: [ {type: String} ],
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User'}],
        comments : [{ type: mongoose.Types.ObjectId, ref: 'Comment'}],
        createdAt: { type: Date, default: Date.now},
    },
    {timestamps: true},
)



module.exports = mongoose.model('Post', postSchema);