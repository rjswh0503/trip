const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const placesSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true},
        address: { type: String, required: true },
        location: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
        likes: { type: Number, default: 0},
        ratings: { type: Number, default: 0 },
        review: [{ type: mongoose.Types.ObjectId, ref: 'Review'}],
        comment: [{ type: mongoose.Types.ObjectId, ref: "Comment"}],
    },
    { timestamps: true }
)


module.exports = mongoose.model('Place', placesSchema)