const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
    {
        author: { type: mongoose.Types.ObjectId, require: true, ref: 'User'},
        place: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Places',default: [] }],
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, required: true },
        rating: { type: Number, required: true, default: 0 },
        comment: [{ type: mongoose.Types.ObjectId, ref: 'Comment',default: [] }],
        likes: { type: Number, required: true, default: 0 }
    },
    { timestamps: true }
);


module.exports = mongoose.model('Review', reviewSchema)