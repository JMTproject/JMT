require('dotenv').config();
const jwt = require('jsonwebtoken');


exports.auth = (req, res, next) => {

  
  const token = req.headers.authorization;
  console.log('콘솔확인', token);
  
  if (!token) {
    return res.json({ result: false, message:'토큰 정보 없음'});
  }
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        return res.status(403).json({ result: false });
      }
      req.userInfo = decode; 
      next();
    });
  


};


