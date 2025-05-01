const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    if(!req.userData || req.userData.role !== 'admin'){
        const error = new HttpError('접근 권한이 없습니다.', 403);
        return next(error);
    }
    next();
};