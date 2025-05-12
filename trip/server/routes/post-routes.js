const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/auth-middleware');

const upload = require('../middleware/uploadPostImg');
const postController = require('../controller/posts-controller');
const checkAdmin = require('../middleware/check-admin');
const router = express.Router();







// 게시글 전체 조회
router.get('/list', postController.getPostList);

//새로 등록된 게시글 리스트 5개 
router.get('/popular', postController.getTopPosts);

// 특정 게시글 조회
router.get('/:id', postController.getPostById);



router.use(checkAuth);
// 게시글 추가 
// 게시글 추가 router에 check()함수를 사용해서 검증 확인

router.post('/add',
    [
        check('title').not().isEmpty(),
        check('content').isLength( { min: 3 } )
    ],
    upload.array('images',5),
    postController.addPost
);





// 게시글 수정 router
router.patch('/:id/edit',
    [
        check('title').not().isEmpty(),
        check('content').isLength( { min: 3} )
    ],
    postController.updatePost
);


// 게시글 삭제 router
router.delete('/:id', checkAdmin, postController.deletePost);


// 게시글 댓글 리스트 조회
router.get('/:id/comments');

// 게시글 댓글 작성
router.post('/:id/comments');



module.exports = router; 