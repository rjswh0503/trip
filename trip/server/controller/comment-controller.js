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
    const postId = req.params.id;

    let comments;
    try {

        comments = await Comment.find({ post: postId }).populate('author', 'name').sort({ createdAt: -1 });

    } catch (e) {

        const error = new HttpError('덧글 불러오는데 실패했습니다.', 500);
        return next(error);

    }



    res.json({
        comments
    })
}

// 덧글 수정

const updateComment = async (req, res, next) => {
    const { content } = req.body;
    const CommentId = req.params.id;

    let update;
    try {
        update = await Comment.findById(CommentId);

    } catch (e) {
        const error = new HttpError('업데이트 실패했습니다.', 500);
        return next(error);
    };

    if(update.author.toString() !== req.userData.userId){
        const error = new HttpError('업데이트 할 권한이 없습니다.', 401);
        return next(error);
    }

    update.content;

    try {
        await update.save();
        
    } catch(e){
        const error = new HttpError('업데이트 실패했습니다.', 500);
        return next(error);
    };

    res.status(200).json({ update: update })
};


// 특정 유저 덧글 삭제

const deleteComment = async (req, res, next) => {
    const CommentId = req.params.id;

    let comment;

    try {
        comment = await Comment.findById(CommentId).populate('author');
    } catch(e){
        const error = new HttpError('덧글을 삭제할 수 없습니다.', 500);
        return next(error);
    }

    if(!comment){
        const error = new HttpError('해당하는 유저의 덧글이 없습니다.', 404);
        return next(error);
    }
    if(comment.author._id.toString() !== req.userData.userId){
        const error = new HttpError('삭제할 권한이 없습니다.', 401);
        return next(error);
    }


    //덧글 삭제시 데이터베이스 세션 업데이트

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await comment.deleteOne({ session });
        comment.author.comments.pull(comment);
        await comment.author.save({ session });
        await session.commitTransaction();
    } catch(e) {
        const error = new HttpError('오류가 발생했습니다. 덧글을 삭제할 수 없습니다.', 501);
        return next(error);
    }
    res.status(200).json({ message: '성공적으로 삭제되었습니다.'});

};




exports.addComment = addComment;
exports.getCommentList = getCommentList;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;