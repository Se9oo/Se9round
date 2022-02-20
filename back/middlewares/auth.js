const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.LOGIN_KEY, { expiresIn: '15m' });
};

exports.verifyAccessToken = (req, res, next) => {
  try {
    if (!req.headers.cookie) {
      res.status(401).json('로그인 필요');
    } else {
      const cookies = req.headers.cookie.split(' ');

      const accessToken = cookies[0].split('user=')[1];
      const decoded = jwt.verify(accessToken, process.env.LOGIN_KEY);

      if (decoded) {
        next();
      } else {
        res.status(401).json('권한이 없습니다.');
      }
    }
  } catch (err) {
    res.status(401).json('error');
  }
};

exports.createRefreshToken = () => {
  return jwt.sign({}, process.env.LOGIN_KEY, { expiresIn: '1d' });
};
