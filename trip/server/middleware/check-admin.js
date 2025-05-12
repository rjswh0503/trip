const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    if (!req.userData || req.userData.role !== 'admin') {
        return res.status(403).json({
            message: '관리자만 삭제 가능합니다.'
        })
    }
    next();
};