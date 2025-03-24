const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');



// 회원가입 비즈니스 로직

const register = async (req, res, next) => {

    const { name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (e) {
        const error = new HttpError('회원가입 실패', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('사용자가 이미 존재합니다. 다른 이메일을 사용해주세요.', 401);
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
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/280px-Golde33443.jpg',
        favorites: [],
        review: [],
        post: [],
        comment: []
    });

    try {
        await createUser.save();
    } catch(e){
        const error = new HttpError('회원가입을 실패했습니다. 다시 시도해주세요.', 500);
        return next(error);
    }

    res.status(201).json({ name: createUser.name, email: createUser.email });

}


exports.register = register;






