const HttpError = require('../models/http-error');
const User = require('../models/user');
const review = require('../models/review');
const Place = require('../models/places');
const getCoordsForAddress = require('../util/location');
const { default: mongoose } = require('mongoose');







//여행지 추가 

const addPlaces = async (req, res, next) => {

    const { title, description, category, city, address, region, country } = req.body;
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
        country,
        city,
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

// controllers/places-controllers.js

const getAllPlaces = async (req, res, next) => {
    let places;

    try {
        places = await Place.find().populate('creator', 'name');
    } catch (e) {
        const error = new HttpError('여행지 리스트 불러오는데 실패했습니다.', 500);
        return next(error);
    }


    res.json({
        places: places
    });
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


//여행지 수정





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

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await places.deleteOne({ session });
        places.creator.places.pull(places);
        await places.creator.save({ session });
        await session.commitTransaction();
    } catch (e) {
        const error = new HttpError('삭제할 수 없습니다.', 500);
        return next(error);
    }
    res.status(200).json({ message: '성공적으로 삭제되었습니다.' });

}




//여행지 인기 5위 리스트






// 카테고리별 여행지 조회 (도시, 시골 등등)






// 여행지 좋아요

const toggleLike = async (req, res, next) => {
    const userId = req.userData.userId; // 현재 로그인한 유저
    const placesId = req.params.id;

    let place, user;

    try {
        user = await User.findById(userId);
        place = await Place.findById(placesId);

        if (!place || !user) {
            const error = new HttpError('여행지나 유저를 찾을 수 없습니다.', 404);
            return next(error);
        }
    } catch (e) {
        const error = new HttpError('서버 오류', 500);
        return next(error);
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const isBookmarked = place.likes.includes(userId);

        if (isBookmarked) {
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
        await session.abortTransaction();
        session.endSession();
        const error = new HttpError('좋아요 실패', 500);
        return next(error);
    }
}






// 여행지 찜

const toggleBookMark = async (req, res, next) => {
    const userId = req.userData.userId;
    const placesId = req.params.id;

    let users, place;


    try {
        users = await User.findById(userId);
        place = await Place.findById(placesId);

        if (!users || !place) {
            const error = new HttpError('유저나 장소를 찾을 수 없습니다.', 404);
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
                    message: '북마크가 제거되었습니다.',
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
                    message: '북마크에 추가되었습니다.',
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
        const error = new HttpError('북마크 실패', 500); 
        return next(error);
    }
}




exports.addPlaces = addPlaces;
exports.getAllPlaces = getAllPlaces;
exports.getPlacesById = getPlacesById;
exports.deletePlace = deletePlace;
exports.toggleLike = toggleLike;
exports.toggleBookMark = toggleBookMark;