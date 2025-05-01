const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const user = require('../models/user');



module.exports = (req, res, next) => {
    // OPTIONS 요청은 인증 없이 통과시킴 (프리플라이트)
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: '인증 토큰이 없습니다.' });
        }

        const token = authHeader.split(' ')[1]; // "Bearer token"
        const decodedToken = jwt.verify(token, 'Secret-Code');

        

        req.userData = { userId: decodedToken.userId, role: decodedToken.role };
        next();

    } catch (err) {
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
};