const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const prodCookieOption = {
  httpOnly: true,
  overwrite: true,
  secure: true,
  domain: '.se9round.dev',
};

const devCookieOption = {
  httpOnly: true,
  overwrite: true,
};

// access token 생성
exports.createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.LOGIN_KEY, { expiresIn: '15m' });
};

// refresh token 생성
exports.createRefreshToken = () => {
  return jwt.sign({}, process.env.LOGIN_KEY, { expiresIn: '1d' });
};

// token 검증
exports.verifyTokens = (req, res, next) => {
  try {
    if (Object.keys(req.cookies).length === 0) {
      res.status(401).json('로그인 필요');
    } else {
      const cookies = req.cookies;

      let accessToken = cookies.user;
      let refreshToken = cookies.refresh;

      // token 검증
      const decodedAccessToken = checkToken(accessToken);
      const decodedRefreshToken = checkToken(refreshToken);

      // access, refresh token 둘 다 만료된 경우
      if (!decodedAccessToken && !decodedRefreshToken) {
        res.status(401).json('권한이 없습니다.');
        // access token 만 만료된 경우
      } else {
        if (!decodedAccessToken && decodedRefreshToken) {
          // access token 재발급
          const newAccessToken = this.createAccessToken({ admin: 'admin' });

          res.cookie(
            'user',
            newAccessToken,
            process.env.NODE_ENV === 'production' ? prodCookieOption : devCookieOption
          );
          // refresh token 만 만료된 경우
        } else if (decodedAccessToken && !decodedRefreshToken) {
          // refresh token 재발급
          const newRefreshToken = this.createRefreshToken();

          res.cookie(
            'refresh',
            newRefreshToken,
            process.env.NODE_ENV === 'production' ? prodCookieOption : devCookieOption
          );
        }
        next();
      }
    }
  } catch (err) {
    res.status(500).json('error');
  }
};

// 각 token 검증
const checkToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.LOGIN_KEY);

    return decodedToken;
  } catch (err) {
    return null;
  }
};
