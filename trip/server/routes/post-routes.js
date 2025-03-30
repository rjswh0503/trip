const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/auth-middleware');

const postController = require('../controller/posts-controller');
const router = express.Router();





// 게시글 전체 조회
router.get('/');

// 특정 게시글 조회
router.get('/:id');

// 게시글 추가 
// 게시글 추가 router에 check()함수를 사용해서 검증 확인
// 
router.use(checkAuth);

router.post('/add',
    [
        check('title').not().isEmpty(),
        check('content').isLength( { min: 3 } )
    ],
    postController.addPost
);


// 게시글 수정 router
router.patch('/:id',
    [
        check('title').not().isEmpty(),
        check('description').isLength( { min: 3} )
    ]
);


// 게시글 삭제 router
router.delete('/:id');


// 게시글 댓글 리스트 조회
router.get('/:id/comments');

// 게시글 댓글 작성
router.post('/:id/comments');



module.exports = router; 