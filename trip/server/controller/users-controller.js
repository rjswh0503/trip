const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Place = require('../models/places');
const user = require('../models/user');



// 회원가입 비즈니스 로직

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
    res.status(201).json({ name: createUser.name, email: createUser.email,image: createUser.image, token: token });

    console.log(token)

}





// 로그인 비즈니스 로직

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


// 특정 유저 프로필 조회 & 작성한 게시글 조회 & 작성한 덧글 조회 

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
        }).populate('post', 'title').populate('bookMark', 'title');
    } catch (e) {
        const error = new HttpError('프로필 불러오기 실패했습니다. 다시 시도해주세요.', 401);
        return next(error);
    }

    

    res.json({
        name: profile.name,
        email: profile.email,
        image: profile.image,
        review: profile.review,
        post: profile.post,
        comment: profile.comments,
        role: profile.role,
        createdAt: profile.createdAt
        
    });

}

// 유저 프로필 수정 로직

const updateUserById = async (req, res, next) => {

    const { name, password } = req.body;
    const userId = req.userData.userId;

    let updateUser;

    try {
        updateUser = await User.findById(userId);
    } catch (e) {
        const error = new HttpError('업데이트 하는데 실패했습니다. 다시 시도해 주세요.', 500);
        return next(error);
        // return next(error)가 없으면 오류 발생시 코드 작동 중지가 안된다.
    }

    updateUser.name = name
    updateUser.password = password


    try {
        updateUser.save();
    } catch (e) {
        const error = new HttpError('업데이트 실패 다시 시도해 주세요.', 500);
        return next(error);
    }


}



// 찜한 여행지 조회

const getBookMarks = async (req,res,next) => {
    const userId = req.userData.userId;
    let user;

    

    try {
        user = await User.findById(userId).populate('bookMark', 'title content images');
        
        if (!user) {
            const error = new HttpError('찜한 여행지 조회 실패', 404);
            return next(error);
        }
    } catch(e) {
        const error = new HttpError('찜한 여행지 조회 실패', 500);
        return next(error);
    }
    res.json({
        bookMark: user.bookMark
    });
}


// 좋아요 누른 여행지 조회

const getLikes = async (req,res,next) => {
    const userId = req.userData.userId;
    let user;

    try {
        user = await User.findById(userId).populate('likes', 'title images content');
    } catch(e) {
        const error = new HttpError('좋아요 누른 여행지 조회 실패', 500);
        return next(error);
    }

    res.json({
        likes: user.likes
    });
}




exports.register = register;
exports.login = login;
exports.getUserbyId = getUserbyId;
exports.updateUserById = updateUserById;
exports.getBookMarks = getBookMarks;
exports.getLikes = getLikes;






