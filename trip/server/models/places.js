const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const placesSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        images: [{ type: String }],
        category: { type: String, required: true },
        country: { type: String, required: true},
        city: { type: String, required: true },
        region: { type: String, required: true },
        address: { type: String, required: true },
        location: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User'}],
        recommend: [{ type: mongoose.Types.ObjectId, ref: 'User'}],     
        view: { type: Number, default: 0 },
        reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
        comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
        creator: { type: mongoose.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
)


module.exports = mongoose.model('Place', placesSchema)