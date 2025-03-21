const express = require('express');

const { check } = require('express-validator');

const router = express.Router();


// 여행 후기 리스트 조회
router.get('/');

// 여행 후기 작성
router.post('/');

//여행 후기 조회
router.get('/:id');

//여행 후기 수정
router.patch('/:id');

//여행 후기 삭제
router.delete('/:id');

//여행 후기 댓글 리스트 조회
router.get('/:id/comments');

//여행 후기 댓글 작성
router.post('/:id/comments');




module.exports = router;