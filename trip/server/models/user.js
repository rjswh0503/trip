const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String },
        // favorites, post, comment 는 한 유저가 여러개의 여행지,게시글,덧글을 추가할 수 있게 배열로 해야 한다.
        bookMark: [{ type: mongoose.Types.ObjectId, ref: 'Place' }],
        likes: [{ type: mongoose.Types.ObjectId, ref: 'Place'}],
        recommend : [{ type: mongoose.Types.ObjectId, ref: 'Review'}],
        reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
        post: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
        places: [{ type: mongoose.Types.ObjectId, ref: 'Place'}],
        comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
        role: { type: String, required: true, default: 'User' },
        friend: [{ type: mongoose.Types.ObjectId, ref: 'User'}]
    },
    { timestamps: true }
)




module.exports = mongoose.model('User', userSchema)