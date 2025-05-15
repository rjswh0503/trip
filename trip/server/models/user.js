const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String },
        bookMark: [{ type: mongoose.Types.ObjectId, ref: 'Place' }],
        likes: [{ type: mongoose.Types.ObjectId, ref: 'Place'}],
        recommend : [{ type: mongoose.Types.ObjectId, ref: 'Review'}],
        reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
        post: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
        places: [{ type: mongoose.Types.ObjectId, ref: 'Place'}],
        comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
        role: { type: String, required: true, default: 'User' },
    },
    { timestamps: true }
)




module.exports = mongoose.model('User', userSchema)