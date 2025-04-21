const HttpError = require('../models/http-error');
const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const Review = require('../models/review');
const Place = require('../models/places');



//리뷰 작성 로직

const addReview = async (req, res, next) => {
    const { title, content, placeId, rating } = req.body;
    const userId = req.userData.userId;

    

    let user, place;

    try {

        user = await User.findById(userId);
        place = await Place.findById(placeId);

        if(!user){
            const error = new HttpError('유저가 없습니다.', 401);
            return next(error);
        } 

        if(!place) {
            const error = new HttpError('해당 장소가 없습니다.', 401);
            return next(error);

        }

        const session = mongoose.startSession();
        await session.startTransaction();

        const createReview = new Review({
            author: userId,
            placeId,
            title,
            content,
            rating
        });

        await createReview.save({ session });

        user.review.push(createReview);
        await user.save({ session });

        place.reviews.push(createReview);
        await place.save({ session });

        
        await session.commitTransaction();
        await session.endSession();

        res.status(201).json({
            message: '리뷰 작성 완료',
            review: createReview
        })


    } catch(e){
        const error = new HttpError('리뷰 작성 실패', 500);
        return next(error);
    }

    
}



// 특정 장소의 리뷰 조회

const PlacesByReview = async (req, res, next) => {
    const placeId = req.body.id;

    let review;

    try {
        review = await Place.findById({ placeId }).populate('author', 'name image');


        if(!review){
            const error = new HttpError('해당 장소의 리뷰를 찾을 수 없습니다.', 401);
            return next(error);
        }
        

    } catch(e){
        const error = new HttpError('리뷰 조회 실패!', e);
    }
    res.status(200).json({
        message: '리뷰 조회 성공',
        review
    })
}








exports.addReview = addReview;
exports.PlacesByReview = PlacesByReview;
