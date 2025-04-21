const express = require('express');
const checkAuth = require('../middleware/auth-middleware');
const reviewController = require('../controller/review-controller');
const router = express.Router();


// 특정 장소의 리뷰 조회
router.get('/:id/review', reviewController.PlacesByReview);

router.use(checkAuth);

// 여행 리뷰 작성
router.post('/', reviewController.addReview);

//여행 리뷰 조회
router.get('/:id/review/:id');

//여행 리뷰 수정
router.patch('/:id');

//여행 리뷰 삭제
router.delete('/:id');


//여행 리뷰 좋아요
router.post('/:id/review/:id/likes');


//여행 리뷰 rating






module.exports = router;