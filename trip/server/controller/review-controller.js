const HttpError = require('../models/http-error');
const User = require('../models/user');
const Review = require('../models/review');
const Place = require('../models/places');
const mongoose = require('mongoose');



//리뷰 작성 로직

const addReview = async (req, res, next) => {
    const { title, content, rating, placeId } = req.body;
    const userId = req.userData.userId;



    let user, place;

    try {

        user = await User.findById(userId);
        place = await Place.findById(placeId);

        if (!user) {
            const error = new HttpError('유저가 없습니다.', 401);
            return next(error);
        }

        if (!place) {
            const error = new HttpError('해당 장소가 없습니다.', 404);
            return next(error);

        }

        const session = await mongoose.startSession();
        await session.startTransaction();

        const createReview = new Review({
            author: userId,
            places: placeId,
            title,
            content,
        });

        await createReview.save({ session });

        user.reviews.push(createReview);
        await user.save({ session });

        place.reviews.push(createReview);
        await place.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: '리뷰 작성 완료',
            review: createReview
        })


    } catch (e) {
        const error = new HttpError('리뷰 작성 실패', 500);
        console.error('리뷰 작성 실패 서버 에러:', e);
        return next(error);
    }


}



// 특정 장소의 리뷰 조회

const PlacesByReview = async (req, res, next) => {
    const placeId = req.params.placeId;


    
    let reviews;

    try {
        reviews = await Review.find({ places: placeId }).populate('author', 'name image').populate('places', 'title region');
        console.log(placeId);
        if (!reviews || reviews.length === 0) {
            const error = new HttpError('해당 장소의 리뷰를 찾을 수 없습니다.', 404); // 404로 변경
            return next(error);
        }

    } catch (e) {
        console.error('리뷰 조회 중 에러:', e);
        const error = new HttpError('리뷰 조회 실패!', 500); // 서버 에러는 500 코드
        return next(error);
    }

    res.status(200).json({
        message: '리뷰 조회 성공',
        reviews
    });
}



// 특정 리뷰 상세보기

const getReviewById = async (req, res, next) => {
    const reviewId = req.params.reviewId;

    let review;

    try {
        review = await Review.findById(reviewId).populate('author', 'name image').populate('places', 'title region');
    } catch (e) {
        console.error(e);
        const error = new HttpError('리뷰 상세보기 실패', 500);
        return next(error);

    }

    res.status(202).json({
        message: '리뷰 상세보기 성공',
        success: true,
        review: review
    });
}


// 리뷰 수정 

const updateReview = async (req, res, next) => {
    const { title, content } = req.body;
    
    const reviewId = req.params.reviewId;

    let updateReview;

    try {
        updateReview = await Review.findById(reviewId);



    } catch (e) {
        console.error(e);
        const error = new HttpError('리뷰 수정 실패', 500);
        return next(error);
    }

    if (updateReview.author.toString() !== req.userData.userId) {
        const error = new HttpError('수정 권한이 없습니다.', 401);
        return next(error);
    }
    updateReview.title = title;
    updateReview.content = content;

    try {
        await updateReview.save();
    } catch (e) {
        const error = new HttpError('리뷰 수정 실패했습니다.', 500);
        return next(error);
    };

    res.status(200).json({
        updateReview: updateReview
    })
}



// 리뷰 삭제

const deleteReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const placeId = req.params.placeId;

    let review, place;

    try {
        review = await Review.findById(reviewId).populate('author');
        place = await Place.findById(placeId);
        
    } catch (e) {
        console.error(e);
        return next(new HttpError('리뷰 삭제 오류', 500));
    }

    if (!review || !place) {
        return next(new HttpError('해당 장소의 리뷰가 없습니다.', 404));
    }

    if (review.author._id.toString() !== req.userData.userId) {
        return next(new HttpError('삭제 권한이 없습니다.', 401));
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await review.deleteOne({ session });

        

        place.reviews.pull(review._id);
        await place.save({ session });

        await session.commitTransaction();
    } catch (e) {
        console.error(e);
        await session.abortTransaction();
        return next(new HttpError('삭제 실패', 500));
    } finally {
        session.endSession();
    }

    res.status(200).json({ message: '삭제 성공' });
};








// 리뷰 추천  

const toggleRecommend = async (req, res, next) => {
    const userId = req.userData.userId;
    const reviewId = req.params.reviewId;

    let user, review;



    try {
        user = await User.findById(userId);
        review = await Review.findById(reviewId);


        if (!user) {
            const error = new HttpError('로그인 안되어 있음.', 401);
            return next(error);
        }

    } catch (e) {
        console.error(e);
        const error = new HttpError('서버 오류', 500);
        return next(error);
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    let IsRecommend;
    try {

        IsRecommend = review.recommend.includes(userId);

        if (IsRecommend) {
            review.recommend.pull(userId);
            user.recommend.pull(reviewId);
            await review.save({ session });
            await user.save({ session });
            await session.commitTransaction();
            session.endSession();
            return res.status(200).json({
                message: '리뷰 추천 취소',
                recommendedByUser: false,
                recommendedCount: review.recommend.length
            });

        } else {
            review.recommend.push(userId);
            user.recommend.push(reviewId);
            await review.save({ session });
            await user.save({ session });
            await session.commitTransaction();
            session.endSession();
            return res.status(200).json({
                message: '리뷰 추천 추가',
                recommendedByUser: true,
                recommendedCount: review.recommend.length
            })

        }


    } catch (e) {
        console.error(e);
        await session.abortTransaction();
        session.endSession();
        const error = new HttpError('좋아요 실패', 500);
        return next(error);
    }

}


// 추천 많이 받은 인기 리뷰 3개

const getTopReviews = async (req,res,next) => {
    try {
        const topReviews = await Review.find().sort({
            recommend: -1, createdAt: -1 
        }).limit(3).populate('places', 'name region').populate('author', 'name image');
        res.status(200).json({
            topReviews
        })
    } catch(e){
        console.error(e);
        const error = new HttpError('인기 리뷰 조회 실패', 500);
        return next(error);
    }
}




exports.addReview = addReview;
exports.PlacesByReview = PlacesByReview;
exports.getReviewById = getReviewById;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
exports.toggleRecommend = toggleRecommend;
exports.getTopReviews = getTopReviews;