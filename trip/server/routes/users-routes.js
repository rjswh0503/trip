const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const checkAuth = require('../middleware/auth-middleware');
const uploadUser = require('../middleware/uploadUserImg');
const userController = require('../controller/users-controller');





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
    uploadUser.single('image'),
    userController.register

);


// 로그인 router
router.post('/login', userController.login);

// 프로필조회 router
// 특정 :id 조회 
router.get('/:id/profile', userController.getUserbyId);


router.use(checkAuth);




//프로필 수정 router
router.patch('/:id/edit', userController.updateUserById);

//회원 탈퇴 router
// Param을 사용하여 특정 :id(param) 삭제 
router.delete('/:id/delete', userController.deleteUserById);


//내가 쓴 게시글
router.get('/:id/posts', userController.getUserbyId);


//내가 쓴 덧글
router.get('/:id/comments', userController.getUserbyId);

//내가 찜한 여행지 router
router.get('/:id/bookMark', userController.getBookMarks);

//내가 좋아요 누른 게시글

router.get('/:id/likes', userController.getLikes);



module.exports = router;