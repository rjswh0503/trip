const express = require('express');
const { check } = require('express-validator');

const router = express.Router();


// 모든 여행지 조회
router.get('/');

//특정 여행지 조회
router.get('/:id');

//새로운 여행지 등록
router.post('/',
    [
        check('title')
        .not()
        .isEmpty(),
        check('description').isLength({min: 5}),

        check('address').not().isEmpty()
    ],
    

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
router.delete('/:id');



//여행지 인기 top5 



//카테고리별 여행지




module.exports = router;