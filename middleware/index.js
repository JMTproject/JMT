require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('콘솔확인', token);

    if (!token) {
        return res.json({ result: false, message: '토큰 정보 없음' });
    }

    jwt.verify(token, process.env.SECRET, (err, decode) => {
        if (err) {
            return res.status(403).json({ result: false, message: '유효하지 않은 토큰' });
        }

        req.userInfo = decode;

        // // 추가적인 권한 확인 (예: 관리자만 접근 가능)
        // if (req.userInfo.role !== 'admin') {
        //     return res.status(403).json({ result: false, message: '권한이 없습니다' });
        // }

        next();
    });
};
