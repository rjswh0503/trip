const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const userController = require('../controller/users-controller');
const user = require('../models/user');




// 회원가입 router
router.post('/register',
    [
        check('name')
            .not()
            .isEmpty(),
        check('email').normalizeEmail() // 이메일 형식인지 확인하는 함수
            .isEmail(),
        check('password').isLength({ min: 6 })
    ],
    userController.register

);


// 로그인 router
router.post('/login', userController.login);


// 프로필조회 router
// 특정 :id 조회 
router.get('/:id/profile', userController.getUserbyId);


//프로필 수정 router
router.patch('/:id/profile', userController.updateUserById);

//회원 탈퇴 router
// Param을 사용하여 특정 :id(param) 삭제 
router.delete('/:id');


//내가 쓴 게시글
router.get('/:id/posts', userController.getUserbyId);


//내가 쓴 덧글
router.get('/:id/comments');

//내가 찜한 여행지 router
router.get('/:id/favorites/places');

//내가 좋아요 누른 게시글

router.get('/:id/likes/posts');



module.exports = router;