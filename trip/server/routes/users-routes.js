const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const checkAuth = require('../middleware/auth-middleware');
const uploadUser = require('../middleware/uploadUserImg');
const userController = require('../controller/users-controller');
const checkAdmin = require('../middleware/check-admin');





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

//내가 작성한 리뷰 

router.get('/:id/reviews', userController.getUserbyId);

//내가 찜한 여행지 router
router.get('/:id/bookMark', userController.getBookMarks);

//내가 좋아요 누른 게시글

router.get('/:id/likes', userController.getLikes);


// 추천 누른 리뷰

router.get('/:id/reviews/recommend', userController.getReviews);





// ========== Admin ==========

//어드민 페이지
router.get('/admin', checkAdmin, userController.getAllitems);


//어드민 페이지에서의 새로 가입한 유저 리스트 최대3명
router.get('/admin/latestUsers', checkAdmin, userController.getLatestUsers);


//어드민 페이지에서의 전체 유저 리스트 (유저삭제 등등);
router.get('/admin/allUsers', checkAdmin, userController.getAllUsers);



//어드민 페이지에서의 유저 검색 기능
router.get('/admin/users/search', checkAdmin, );


//어드민 페이지에서의 여행지 관리

router.get('/admin/allPlaces', checkAdmin, userController.getAllPlaces);


//어드민 페이지에서의 리뷰 관리
router.get('/admin/allReviews', checkAdmin, userController.getAllReviews);


//어드민 페이지에서의 게시글 관리
router.get('/admin/allPosts', checkAdmin, userController.getAllPosts);

//어드민 페이지에서의 덧글 관리
router.get('/admin/allComments', checkAdmin, userController.getAllComment);




module.exports = router;