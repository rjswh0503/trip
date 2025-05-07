const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // OPTIONS 요청은 인증 없이 통과시킴 (프리플라이트)
    if (req.method === 'OPTIONS') {
        return next();
    }

    const authHeader = req.headers.authorization;

    // ✅ 토큰이 없으면 로그인 안 한 사용자로 간주하고 통과
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.userData = null;
        return next();
    }

    try {
        const token = authHeader.split(' ')[1]; // "Bearer token"
        const decodedToken = jwt.verify(token, 'Secret-Code');

        // 로그인 성공: 사용자 정보 저장
        req.userData = {
            userId: decodedToken.userId,
            role: decodedToken.role,
        };
    } catch (err) {
        // 토큰 오류여도 로그인 안 한 걸로 간주
        req.userData = null;
    }

    next();
};
