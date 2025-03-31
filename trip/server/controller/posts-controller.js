const HttpError = require('../models/http-error');
const Post = require('../models/post');







// 게시글 전체 조회

const getPostList = async (req, res, next) => {
    let postList;
    try {
        postList = await Post.find().populate('author', 'name');
    } catch(e){
        const error = new HttpError('게시글 불러오는데 실패했습니다.', 500);
        return next(error);
    }

    res.json({
        postList
    })

}



// 게시글 작성 로직

const addPost = async (req,res,next) => {
    const {title, content} = req.body;

    const createPlace = new Post({
        author: req.userData.userId,
        title,
        content,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw',
    });

    try {
        await createPlace.save();
    } catch(e){
        const error = new HttpError('게시글 작성 실패',401)
        return next(error);
    }

    res.json({
        msg: '게시글 작성 성공'
    })

}



// 게시글 상세보기

const getPostById = async (req, res, next) => {

    const postId = req.params.id;

    let post;
    try {
        post = await Post.findById(postId).populate('author', 'name');

    } catch(e){
        const error = new HttpError('게시글 상세보기 애러', 401);
        return next(error);
    }

    res.json({
        post

    })
};





exports.getPostList = getPostList;
exports.addPost = addPost;
exports.getPostById = getPostById;
