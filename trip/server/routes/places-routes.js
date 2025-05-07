const express = require('express');
const { check } = require('express-validator');
const placesController = require('../controller/places-controller');
const checkAuth = require('../middleware/auth-middleware');
const upload = require('../middleware/uploadPlacesImg');
const router = express.Router();



router.use(checkAuth);


// 모든 여행지 조회
router.get('/', placesController.getAllPlaces);


//여행지 인기 top5

router.get('/top5', placesController.getTop5HotPlaces);


//지역별 여행지
router.get('/region', placesController.placesByRegion);


//특정 여행지 조회
router.get('/:id', placesController.getPlacesById);



//새로운 여행지 등록
router.post('/',
    [
        check('title')
        .not()
        .isEmpty(),
        check('description').isLength({min: 5}),

        check('address').not().isEmpty()
    ],
    upload.array('images',5),
    placesController.addPlaces
);





//여행지 수정
router.patch('/:id',
    [
        check('title')
        .not()
        .isEmpty(),
        check('description').isLength({min: 5}),
    ],
);


//여행지 삭제
router.delete('/:id', placesController.deletePlace);





//여행지 좋아요
router.post('/:id/like', placesController.toggleLike);




// 여행지 북마크

router.post('/:id/bookMark', placesController.toggleBookMark);



module.exports = router;