const express = require('express');
const checkAuth = require('../middleware/auth-middleware');
const reviewController = require('../controller/review-controller');
const checkAdmin = require('../middleware/check-admin');

const router = express.Router();




// 특정 장소의 리뷰 조회
router.get('/:placeId/review/list', reviewController.PlacesByReview);


//여행 리뷰 상세조회
router.get('/:placeId/review/:reviewId', reviewController.getReviewById);

//인기 리뷰 조회 (추천수)
router.get('/popular', reviewController.getTopReviews);

router.use(checkAuth);

// 여행 리뷰 작성
router.post('/:placeId/review/add', reviewController.addReview);

//여행 리뷰 수정
router.patch('/:placeId/review/:reviewId/edit', reviewController.updateReview);

//여행 리뷰 삭제
router.delete('/:placeId/review/:reviewId/delete',checkAdmin, reviewController.deleteReview);


//여행 리뷰 좋아요
router.post('/:placeId/review/:reviewId/recommend', reviewController.toggleRecommend);



module.exports = router;