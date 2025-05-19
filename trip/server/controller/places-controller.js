const HttpError = require('../models/http-error');
const User = require('../models/user');
const Review = require('../models/review');
const Place = require('../models/places');
const getCoordsForAddress = require('../util/location');
const { default: mongoose } = require('mongoose');







//여행지 추가 

const addPlaces = async (req, res, next) => {

    const { title, description, category, address, region } = req.body;
    const imageUrls = req.files?.map(file => file.location) || [];

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createPlaces = new Place({
        title,
        description,
        images: imageUrls || null,
        category,
        region,
        address,
        location: coordinates,
        creator: req.userData.userId
    })

    console.log(createPlaces)




    let user;

    try {
        user = await User.findById(req.userData.userId);
    } catch (e) {
        console.error('에러 상세:', e);
        const error = new HttpError('여행지 생성하는데 실패했습니다.', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('사용자를 찾을 수 없습니다.', 404);
        return next(error);
    };

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: '관리자만 여행지를 등록할 수 있습니다.' });
    }


    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createPlaces.save({ session });
        user.places.push(createPlaces);
        await user.save({ session });
        await session.commitTransaction();
        session.endSession();

    } catch (e) {

        const error = new HttpError('장소 생성 실패', 500);
        return next(error);
    }


    res.status(201).json({ message: '등록 성공!', places: createPlaces });

}

//여행지 리스트


const getAllPlaces = async (req, res, next) => {
    const userId = req.userData?.userId;
    let places;
    try {
        places = await Place.find().sort({ title: 1 }).lean();

        const likeBookMark = places.map(place => ({
            ...place,
            userLiked: Array.isArray(place.likes) && userId
                ? place.likes.some(id => id?.toString() === userId.toString())
                : false,
            userBookmarked: Array.isArray(place.bookMark) && userId ? place.bookMark.some(id => id?.toString() === userId.toString()) : false,
        }));
        res.json({
            places: likeBookMark
        });
    } catch (e) {
        const error = new HttpError('여행지 리스트 불러오는데 실패했습니다.', 500);
        return next(error);
    }



};




//여행지 상세조회
const getPlacesById = async (req, res, next) => {
    const PlacesId = req.params.id;

    let places;

    try {
        places = await Place.findByIdAndUpdate(PlacesId,
            { $inc: { view: 1 } },
            { new: true }
        ).populate('creator', 'name').populate({
            path: 'comments',
            select: 'content author',
            populate: {
                path: 'author',
                select: 'name'
            }
        });
    } catch (e) {
        const error = new HttpError('여행지 상세보기 실패', 404);
        return next(error);
    }

    res.json({
        places
    })

};



//여행지 삭제

const deletePlace = async (req, res, next) => {
    const PlacesId = req.params.id;

    let places;

    try {
        places = await Place.findById(PlacesId).populate('creator');

    } catch (e) {
        const error = new HttpError('삭제할 수 없습니다.', 500);
        return next(error);
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await Place.deleteOne({ _id: PlacesId }, { session });

        await Review.deleteMany({ places: PlacesId }, { session });

        const deleteReviews = await Review.find({ places: PlacesId }).select('_id');
        const deleteReviewId = deleteReviews.map(r => r._id);

        await User.updateMany(
            { reviews: { $in: deleteReviewId } },
            { $pull: { reviews: { $in: deleteReviewId } } },
            { session }
        );
        await session.commitTransaction();
        session.endSession();
    } catch (e) {
        const error = new HttpError('삭제할 수 없습니다.', 500);
        return next(error);
    }
    res.status(200).json({ message: '성공적으로 삭제되었습니다.' });

}




//여행지 인기 5위 리스트 (조회수 많은 수)

const getTop5HotPlaces = async (req, res, next) => {
    const userId = req.userData?.userId;
    let places;

    try {

        places = await Place.find().sort({ view: -1, createdAt: 1 }).limit(5).lean();

        const likeBookMark = places.map(place => ({
            ...place,
            userLiked: Array.isArray(place.likes) && userId
                ? place.likes.some(id => id?.toString() === userId.toString())
                : false,
            userBookmarked: Array.isArray(place.bookMark) && userId ? place.bookMark.some(id => id?.toString() === userId.toString()) : false,
        }));

        res.status(200).json({
            message: '상위top여행지 조회',
            top5Places: likeBookMark
        })

    } catch (e) {
        console.error(e);
        const error = new HttpError('여행지를 불러올 수 없습니다.', 500);
        return next(error);
    }


}




// 지역별 여행지 조회 (서울, 부산, 제주, 경주 등등)

const placesByRegion = async (req, res, next) => {
    const userId = req.userData?.userId;
    const { region } = req.query;

    if (!region) {
        return res.status(400).json({ message: 'region 쿼리 파라미터가 필요합니다.' });
    }

    try {
        // region 값으로 내림차순 정렬해서 장소 찾기
        const places = await Place.find({ region: region }).sort({ title: 1 }).lean().limit(5);

        const likeBookMark = places.map(place => ({
            ...place,
            userLiked: Array.isArray(place.likes) && userId
                ? place.likes.some(id => id?.toString() === userId.toString())
                : false,
            userBookmarked: Array.isArray(place.bookMark) && userId ? place.bookMark.some(id => id?.toString() === userId.toString()) : false,
        }));

        res.status(200).json({
            places: likeBookMark

        });
    } catch (e) {
        const error = new HttpError('지역을 찾을 수 없습니다.', 500);
        return next(error);
    }
};




// 여행지 좋아요

const toggleLike = async (req, res, next) => {
    const userId = req.userData.userId; // 현재 로그인한 유저
    const placesId = req.params.id; // 장소 id

    let place, user;

    try {
        user = await User.findById(userId);
        place = await Place.findById(placesId);

        if (!user) {
            const error = new HttpError('로그인 안되어 있음.', 401);
            return next(error);
        }
    } catch (e) {
        const error = new HttpError('서버 오류', 500);
        return next(error);
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const isLiked = place.likes.includes(userId);

        if (isLiked) {
            place.likes.pull(userId);
            user.likes.pull(placesId);
            await place.save({ session });
            await user.save({ session });
            await session.commitTransaction();
            session.endSession();
            return res.status(200).json({
                message: '좋아요가 제거되었습니다.',
                LikeByUser: false
            });
        } else {
            place.likes.push(userId);
            user.likes.push(placesId);
            await place.save({ session });
            await user.save({ session });
            await session.commitTransaction();
            session.endSession();
            return res.status(200).json({
                message: '좋아요 추가되었습니다.',
                LikeByUser: true
            });
        }

    } catch (e) {

        const error = new HttpError('좋아요 실패', 500);
        console.error(e);
        return next(error);
    }
}






// 여행지 북마크

const toggleBookMark = async (req, res, next) => {
    const userId = req.userData.userId;
    const placesId = req.params.id;

    let users, place;


    try {
        users = await User.findById(userId);
        place = await Place.findById(placesId);

        if (!users) {
            const error = new HttpError('로그인 안되어 있음.', 401);
            return next(error);
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const isBookmarked = place.bookMark.includes(userId);

            if (isBookmarked) {
                place.bookMark.pull(userId);
                users.bookMark.pull(placesId);
                await place.save({ session });
                await users.save({ session });
                await session.commitTransaction();
                session.endSession();
                return res.status(200).json({
                    message: '북마크 제거되었습니다.',
                    BookMarkByUser: false
                });
            } else {
                place.bookMark.push(userId);
                users.bookMark.push(placesId);
                await place.save({ session });
                await users.save({ session });
                await session.commitTransaction();
                session.endSession();
                return res.status(200).json({
                    message: '북마크 추가되었습니다.',
                    BookMarkByUser: true
                });
            }

        } catch (e) {
            await session.abortTransaction();
            session.endSession();
            const error = new HttpError('북마크 실패', 500);
            return next(error);
        }

    } catch (e) {
        const error = new HttpError('서버오류', 500);
        return next(error);
    }
}




exports.addPlaces = addPlaces;
exports.getAllPlaces = getAllPlaces;
exports.getPlacesById = getPlacesById;
exports.deletePlace = deletePlace;
exports.getTop5HotPlaces = getTop5HotPlaces;
exports.placesByRegion = placesByRegion;
exports.toggleLike = toggleLike;
exports.toggleBookMark = toggleBookMark;