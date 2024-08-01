require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers) {
    return res.status(401).json({ result: false });
  }
  const [bearer, token] = headers.split(' ');
  if (bearer === 'Bearer') {
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        return res.status(403).json({ result: false });
      }
      req.userInfo = decode; 
      next();
    });
  } else {
    return res.status(401).json({ result: false });
  }
};
