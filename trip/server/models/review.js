const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
    {
        author: { type: mongoose.Types.ObjectId, require: true, ref: 'User'},
        places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place'}],
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, required: true },
        rating: { type: Number, required: true, default: 0 },
        view: { type: Number, default: 0 },
        likes: [{ type: Number, required: true, ref: 'User'}]
    },
    { timestamps: true }
);


module.exports = mongoose.model('Review', reviewSchema)