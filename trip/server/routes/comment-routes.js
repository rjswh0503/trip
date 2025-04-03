const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const commentController = require('../controller/comment-controller');
const user = require('../models/user');
const post = require('../models/post');



// 덧글 작성 router
router.post('/',
    [
        check('content')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
    ],
    commentController.addComment
);


// 덧글 리스트 router

router.get('/');


// 덧글 수정 router

router.patch('/:id')


// 덧글 삭제 router
router.delete('/:id');




module.exports = router;