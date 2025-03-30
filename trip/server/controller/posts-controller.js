const HttpError = require('../models/http-error');
const Post = require('../models/post');





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
        const error = new HttpError('게시글 작성 실패', )
        return next(error);
    }

    res.json({
        msg: '게시글 작성 성공'
    })

}






exports.addPost = addPost;