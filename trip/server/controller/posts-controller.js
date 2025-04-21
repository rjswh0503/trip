const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Post = require('../models/post');
const User = require('../models/user');



// 게시글 전체 조회

const getPostList = async (req, res, next) => {
    let postList;
    try {
        postList = await Post.find().populate('author', 'name');
    } catch (e) {
        const error = new HttpError('게시글 불러오는데 실패했습니다.', 500);
        return next(error);
    }

    res.json({
        postList
    })

}



// 게시글 작성 로직

const addPost = async (req, res, next) => {
    const { title, content } = req.body;
    const userId = req.userData.userId;
    const imageUrls = req.files?.map(file => file.location) || [];

    const createPost = new Post({
        author: req.userData.userId,
        title,
        content,
        images: imageUrls || null,
    });

    let user;

    try {
        user = await User.findById(userId);

    } catch (e) {
        const error = new HttpError('게시글 생성하는데 실패했습니다.', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('사용자를 찾을 수 없습니다.', 404);
        return next(error);
    }



    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createPost.save({ session: session });
        user.post.push(createPost);
        await user.save({ session: session });
        await session.commitTransaction();
    } catch (e) {
        const error = new HttpError('게시글 생성 실패했습니다.', 500);
        return next(error);
    }

    res.status(201).json({ post: createPost })

}



// 게시글 상세보기

const getPostById = async (req, res, next) => {

    const postId = req.params.id;

    let post;
    try {
        post = await Post.findById(postId).populate('author', 'name image').populate({
            path: 'comments',
            select: 'content author',
            populate: {
                path: 'author',
                select: 'name'
            }
        });

    } catch (e) {
        const error = new HttpError('게시글 상세보기 애러', 401);
        return next(error);
    }

    res.json({
        post

    })
};


// 특정 유저 게시글 조회

const getPostByUserId = async (req, res, next) => {
    const { userId } = req.params.id;

    let userPost;

    try {
        userPost = await User.findById(userId).populate('post', 'title');

    } catch (e) {
        const error = new HttpError('유저를 찾을 수 없습니다.', 401);
        return next(error);
    }

    if (userPost.post.length === 0) {
        return next(
            new HttpError('해당 유저의 게시물을 찾을 수 없습니다.', 401)
        )
    };
    res.json({ post: userPost.post.map(post => post.toObject({ getters: true })) })
};


// 특정 유저 게시글 수정

const updatePost = async (req, res, next) => {
    const { title, content } = req.body;
    const PostId = req.params.id;

    let update;
    try {
        update = await Post.findById(PostId);

    } catch (e) {
        const error = new HttpError('업데이트 실패했습니다.', 500);
        return next(error);
    }

    if (update.author.toString() !== req.userData.userId) {
        const error = new HttpError('업데이트 할 권한이 없습니다.', 401);
        return next(error);
    }
    update.title = title;
    update.content = content;

    try {
        await update.save();
    } catch (e) {
        const error = new HttpError('업데이트 실패했습니다.', 500);
        return next(error);
    };

    res.status(200).json({ update: update })

};


// 특정 유저 게시글 삭제

const deletePost = async (req, res, next) => {
    const postId = req.params.id;

    let post;

    try {
        post = await Post.findById(postId).populate('author');

    } catch (e) {
        const error = new HttpError('게시글을 삭제할 수 없습니다.', 500);
        return next(error);
    }

    if (!post) {
        const error = new HttpError('해당하는 유저의 게시글이 없습니다.', 404);
        return next(error);
    }

    if (post.author._id.toString() !== req.userData.userId) {

        const error = new HttpError('삭제할 권한이 없습니다.', 401);
        return next(error);

    }



    //게시글 삭제시 데이터베이스 세션 업데이트
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.deleteOne({ session });
        post.author.post.pull(post);
        await post.author.save({ session });
        await session.commitTransaction();
    } catch (e) {
        const error = new HttpError('오류가 발생했습니다. 게시글을 삭제할 수 없습니다.', 500);
        return next(error);
    }

    res.status(200).json({ message: '성공적으로 삭제되었습니다.' });

};

exports.getPostList = getPostList;
exports.getPostByUserId = getPostByUserId;
exports.addPost = addPost;
exports.getPostById = getPostById;
exports.updatePost = updatePost;
exports.deletePost = deletePost;