const HttpError = require('../models/http-error');
const User = require('../models/user');
const review = require('../models/review');
const Place = require('../models/places');
const getCoordsForAddress = require('../util/location');
const { default: mongoose } = require('mongoose');






//여행지 추가 

const addPlaces = async (req, res, next) => {

    const { title, description, category, city, address, region,country } = req.body;
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
        await createPlaces.save({ session }); // ✅ 여기서 저장
        user.places.push(createPlaces);
        await user.save({ session });
        await session.commitTransaction(); // ❗여기 도달 못 하면 저장도 무효
        session.endSession();

    } catch (e) {

        const error = new HttpError('장소 생성 실패', 500);
        return next(error);
    }


    res.status(201).json({ message: '등록 성공!', places: createPlaces });

}

//여행지 리스트

const getAllPlaces = async (req, res, next) => {

    let places;

    try {
        places = await Place.find().populate('creator', 'name');
    } catch (e) {
        const error = new HttpError('여행지 리스트 불러오는데 실패했습니다.', 500);
        return next(error);
    }

    res.json({
        places
    });

}


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
    const userId = req.userData.userId;
    const placesId = req.params.id;

    try {
        const place = await Place.findById(placesId);
        const liked = place.likes.includes(userId);

        if (!liked) {
            await Place.findByIdAndUpdate(placesId, {
                $pull: { likes: userId },
                $inc: { likes: -1 }
            });
        } else {
            await Place.findByIdAndUpdate(placesId, {
                $push: { likes: userId },
                $inc: { likes: 1 }
            });
        }

    } catch (e) {
        const error = new HttpError('좋아요 실패', 500);
        return next(error);
    }

    res.status(200).json({ message: '업데이트 완료' });
}






// 여행지 찜



exports.addPlaces = addPlaces;
exports.getAllPlaces = getAllPlaces;
exports.getPlacesById = getPlacesById;
exports.deletePlace = deletePlace;
exports.toggleLike = toggleLike;