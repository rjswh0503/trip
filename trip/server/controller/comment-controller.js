const HttpError = require('../models/http-error');
const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');
const { default: mongoose } = require('mongoose');
const post = require('../models/post');





// 덧글 작성 로직

const addComment = async (req, res, next) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.userData.userId;

    const createComment = new Comment({
        content,
        author: userId,
        post: postId,
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

    let post;
    try {
        post = await Post.findById(postId);
    } catch (e) {
        const error = new HttpError('게시글을 찾을 수 없습니다.', 500);
        return next(error);
    }

    if (!post) {
        const error = new HttpError('게시글을 찾을 수 없습니다.', 500);
        return next(error);
    }


    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createComment.save({ session: session });
        post.comments.push(createComment)
        user.comments.push(createComment);
        await post.save({ session: session });
        await user.save({ session: session });
        await session.commitTransaction();
        session.endSession();
    } catch (e) {
        const error = new HttpError('덧글 생성 실패했습니다.', 500);
        return next(error);
    }


    res.status(201).json({ comment: createComment });


};

//덧글 조회 로직

const getCommentList = async (req, res, next) => {
    const   postId  = req.params.id;

    let comments;
    try {
        
        comments = await Comment.find({ post: postId }).populate('author', 'name');
        
    } catch (e) {
        
        const error = new HttpError('덧글 불러오는데 실패했습니다.', 500);
        return next(error);
        
    }



    res.json({
        comments
    })
}





exports.addComment = addComment;
exports.getCommentList = getCommentList;