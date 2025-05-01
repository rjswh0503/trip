const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Place = require('../models/places');
const { default: mongoose } = require('mongoose');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Review = require('../models/review');



// 회원가입 

const register = async (req, res, next) => {

    const { name, email, password } = req.body;
    const imageUrl = req.file?.location;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (e) {

        const error = new HttpError('회원가입 실패', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('사용자가 이미 존재합니다.', 401);
        return next(error);
    }




    let hashPassword;

    try {
        hashPassword = await bcrypt.hash(password, 12);

    } catch (e) {
        const error = new HttpError('계정생성에 실패했습니다. 다시 시도해주세요.', 500);
        return next(error);
    }

    const createUser = new User({
        name,
        email,
        password: hashPassword,
        image: imageUrl || null,
        likes: [],
        recommend: [],
        bookMark: [],
        review: [],
        post: [],
        comment: [],

    });

    try {
        await createUser.save();
    } catch (e) {
        const error = new HttpError('회원가입을 실패했습니다. 다시 시도해주세요.', 500);
        return next(error);
    }

    let token;

    try {
        token = jwt.sign(
            {
                userId: createUser.id, email: createUser.email, image: createUser.image
            }, 'Secret-Code',
            {
                expiresIn: '1h'
            }
        );
    } catch (e) {
        const error = new HttpError('회원가입에 실패했습니다. 다시 시도해주세요.', 500);
        return next(error);
    }
    res.status(201).json({ name: createUser.name, email: createUser.email, image: createUser.image, token: token });

    console.log(token)

}





// 로그인 

const login = async (req, res, next) => {

    const { email, password } = req.body;


    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (e) {
        const error = new HttpError('로그인 실패했습니다.', 500);
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError('존재하지 않는 사용자입니다. 회원가입 부터 해주세요.', 401);
        return next(error);
    };



    let IsValidPassword = false;

    try {
        IsValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (e) {
        const error = new HttpError('비밀번호가 올바르지 않습니다. 다시 시도해주세요.', 401);
        return next(error);
    };


    if (!IsValidPassword) {
        const error = new HttpError('비밀번호가 일치하지 않습니다. 다시 시도해주세요.', 401);
        return next(error);
    }

    let token

    try {
        token = jwt.sign(
            {
                userId: existingUser.id, email: existingUser.email, name: existingUser.name, image: existingUser.image, role: existingUser.role
            },
            'Secret-Code',
            {
                expiresIn: '1h'
            }
        )
    } catch (e) {
        const error = new HttpError('로그인 실패 했습니다. 다시 시도해 주세요.', 401);
        return next(error);
    }

    res.json(
        {
            userId: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            image: existingUser.image,
            role: existingUser.role,
            token: token
        }
    );

    console.log(`로그인한 ${existingUser.name}의 토큰은 : [` + token + ']');

}


// 특정 유저 프로필 조회 & 작성한 게시글 조회 & 작성한 덧글 조회 & 작성한 리뷰 조회
const getUserbyId = async (req, res, next) => {

    const userId = req.params.id;
    let profile;
    try {
        profile = await User.findById(userId).populate({
            path: 'comments',
            select: 'content post',
            populate: {
                path: 'post',
                select: 'title'
            }
        }).populate('post', 'title').populate('bookMark', 'title').populate('reviews','title author recommend view');
    } catch (e) {
        const error = new HttpError('프로필 불러오기 실패했습니다. 다시 시도해주세요.', 500);
        return next(error);
    }

    if (!profile) {
        return res.status(404).json({ message: '해당 유저를 찾을 수 없습니다.' });
    }

    res.status(200).json({
        message: '프로필 불러오기 성공',
        id: profile.id,
        name: profile.name,
        email: profile.email,
        post: profile.post || [],
        comment: profile.comments || [],
        reviews: profile.reviews || [],
        image: profile.image || '',
        createdAt: profile.createdAt || '',
    });
}

// 유저 프로필 수정

const updateUserById = async (req, res, next) => {

    const { name, password } = req.body;
    const userId = req.userData.userId;

    let user;
    try {
        user = await User.findById(userId);

        if (!user) {
            const error = new HttpError('해당 유저가 없습니다.', 404);
            return next(error);
        }

        // 비밀번호 업데이트 로직
        if (password) {
            try {
                const hashPassword = await bcrypt.hash(password, 12);
                user.password = hashPassword;
            } catch (e) {
                const error = new HttpError('비밀번호 해싱에 실패했습니다.', 500);
                return next(error);
            }
        }

        // 이름 업데이트 로직
        if (name) {
            user.name = name;

        }

        await user.save();

        res.status(200).json({
            message: '회원정보가 성공적으로 수정되었습니다.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image
            }
        });

    } catch (e) {
        const error = new HttpError('회원정보 수정 실패', 500);
        return next(error);
    }
}




// 회원 탈퇴

const deleteUserById = async (req, res, next) => {
    const userId = req.userData.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return next(new HttpError('해당하는 유저가 없습니다.', 404));
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await User.deleteOne({ _id: userId }, { session });

            await Post.deleteMany({ author: userId }, { session });

            await Comment.deleteMany({ author: userId }, { session });

            await Review.deleteMany({ author: userId }, { session });

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                message: '회원탈퇴 성공',
                user: user.name
            });
        } catch (err) {
            await session.abortTransaction();
            session.endSession();

            return next(new HttpError('회원 탈퇴 도중 오류가 발생했습니다.', 500));
        }
    } catch (e) {
        return next(new HttpError('회원 탈퇴 실패', 500));
    }
}




// 찜한 여행지 조회

const getBookMarks = async (req, res, next) => {
    const userId = req.userData.userId;
    let user;

    try {
        user = await User.findById(userId).populate('bookMark', 'title content images');

        if (!user) {
            const error = new HttpError('찜한 여행지 조회 실패', 404);
            return next(error);
        }
    } catch (e) {
        const error = new HttpError('찜한 여행지 조회 실패', 500);
        return next(error);
    }
    res.json({
        bookMark: user.bookMark
    });
}


// 좋아요 누른 여행지 조회

const getLikes = async (req, res, next) => {
    const userId = req.userData.userId;
    let user;

    try {
        user = await User.findById(userId).populate('likes', 'title images content');
    } catch (e) {
        const error = new HttpError('좋아요 누른 여행지 조회 실패', 500);
        return next(error);
    }

    res.json({
        likes: user.likes
    });
}


// 추천 누른 리뷰 조회

const getReviews = async(req, res, next) => {
    const userId = req.userData.userId;
    let user;

    try {
        user = await User.findById(userId).populate('recommend', 'title image content');

    } catch(e){
        console.error(e);
        const error = new HttpError('추천 누른 여행지 조회 실패', 500);
        return next(error);
    }
    res.status(200).json({
        message: '조회 성공!',
        recommend: user.recommend
    })
}


// 친구추가


// ========== ADMIN ==========


// 전체 유저 조회, 전체 여행지 조회, 전체 리뷰 조회

const getAllitems = async(req,res,next) => {

    try {
        const userCount = await User.countDocuments();
        const placeCount = await Place.countDocuments();
        const reviewCount = await Review.countDocuments();

        res.status(200).json({
            userCount,
            placeCount,
            reviewCount
        })
    } catch(e){
        console.error(e);
        const erorr = new HttpError('조회 실패', 500);
        return next(erorr);
    }
}


// 최근 가입 유저 리스트 

const getLatestUsers = async(req,res,next) => {

    try {
        const latestUsers = await User.find().sort({ createdAt: -1 }).limit(3)
        res.status(200).json({
            latestUsers
        })
    } catch(e){
        console.error(e);
        const error = new HttpError('유저를 찾을 수 없습니다.', 500);
        return next(error);
    }
}






exports.register = register;
exports.login = login;
exports.getUserbyId = getUserbyId;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
exports.getBookMarks = getBookMarks;
exports.getLikes = getLikes;
exports.getReviews = getReviews;
exports.getAllitems = getAllitems;
exports.getLatestUsers = getLatestUsers;







