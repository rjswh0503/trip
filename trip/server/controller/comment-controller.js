const HttpError = require('../models/http-error');
const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');
const { mongo, default: mongoose } = require('mongoose');




// 덧글 작성 로직

const addComment = async (req, res, next) => {
    const { content } = req.body;

    const createComment = new Comment({
        author: req.userData.userId,
        content
    });

    let user;

    try {
        user = await User.findById(req.userData.userId);
    } catch (e) {
        const error = new HttpError('덧글 생성하는데 실패했습니다.', 500);
        return next(error);
    };

    if (!user) {
        const error = new HttpError('사용자를 찾을 수 없습니다.', 404);
        return next(error);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createComment.save({ session: session });
        user.comment.push(createComment);
        await user.save({ session: session });
        await session.commitTransaction();
    } catch (e) {
        const error = new HttpError('덧글 생성 실패했습니다.', 500);
        return next(error);
    }


    res.status(201).json({ comment: createComment });


};

//덧글 조회 로직

const getCommentList = async (req,res,next) => {
    let commentList;
    try {
        commentList = await Comment.find().populate('author', 'content');

    } catch(e){
        const error = new HttpError('덧글 불러오는데 실패했습니다.', 500);
        return next(error);
    }
}




exports.addComment = addComment;