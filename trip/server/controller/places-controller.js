const HttpError = require('../models/http-error');
const User = require('../models/user');
const review = require('../models/review');
const places = require('../models/places');






//여행지 추가 

const addPlaces = async(req, res, next) => {
    const { title, description, category, city, address } = req.body;
    const imageUrls = req.file?.map(file => file.location) || [];

    const createPlaces = new places({
        title,
        description,
        images: imageUrls || null,
        category,
        city,
        address
    });

    let places;

    try {

    } catch(e){
        const error = new HttpError('여행지 생성하는데 실패했습니다.', 500);
        return next(error);
    }
}





//여행지 리스트 





//여행지 상세조회





//여행지 수정





//여행지 삭제





//여행지 인기 5위 리스트





// 카테고리별 여행지 조회 (도시, 시골 등등)






// 여행지 좋아요 




// 여행지 찜



