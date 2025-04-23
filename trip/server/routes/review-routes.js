const express = require('express');
const checkAuth = require('../middleware/auth-middleware');
const reviewController = require('../controller/review-controller');

const router = express.Router();


router.use(checkAuth);

// 특정 장소의 리뷰 조회
router.get('/:placeId/review/list', reviewController.PlacesByReview);


// 여행 리뷰 작성
router.post('/:placeId/review/add', reviewController.addReview);

//여행 리뷰 상세조회
router.get('/:placeId/review/:reviewId', reviewController.getReviewById);

//여행 리뷰 수정
router.patch('/:placeId/review/:reviewId', reviewController.updateReview);

//여행 리뷰 삭제
router.delete('/:placeId/review/:reviewId');


//여행 리뷰 좋아요
router.post('/:placeId/review/:reviewId/recommend', reviewController.toggleRecommend);



module.exports = router;