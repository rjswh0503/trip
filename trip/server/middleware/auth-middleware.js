const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const { getUserId } = require('../controller/users-controller');


module.exports = (req, res, next) => {

    try {
        
        const token = req.header.authorization.split(' ')[1];
        if(!token){
            throw new HttpError('인증에 실패했습니다.', 401);
        }

        const decodedToken = jwt.verify(token, 'Secret-Code');
        req.userData = { userId: decodedToken.userId};
        next()
    } catch (e) {
        const error = new HttpError('인증에 실패했습니다.', 401);
        return next(error);
    }
}