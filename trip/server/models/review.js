const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
    {
        author: { type: mongoose.Types.ObjectId, require: true, ref: 'User'},
        places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place'}],
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String },
        view: { type: Number, default: 0 },
        recommend: [{ type: mongoose.Types.ObjectId, ref: 'User'}]
        
    },
    { timestamps: true }
);


module.exports = mongoose.model('Review', reviewSchema)