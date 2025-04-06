const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/auth-middleware');
const router = express.Router();
const commentController = require('../controller/comment-controller');






// 특정 게시글 덧글  router

router.get('/:id', commentController.getCommentList);

router.use(checkAuth);

// 덧글 작성 router
router.post('/:postId',
    [
        check('content')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
    ],
    commentController.addComment
);





// 덧글 수정 router

router.patch('/:id')


// 덧글 삭제 router
router.delete('/:id');




module.exports = router;