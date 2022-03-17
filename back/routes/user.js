const express = require('express');
const router = express.Router();
const { verifyTokens, createAccessToken, createRefreshToken } = require('../middlewares/auth');
const { requestValueCheck } = require('../middlewares/paramCheck');

const dotenv = require('dotenv');
dotenv.config();

// 관리자 로그인
router.post('/api/admin-login', requestValueCheck, (req, res) => {
  const { key } = req.body.data;

  if (key === process.env.LOGIN_KEY) {
    const payload = { admin: 'admin' };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken();

    res.cookie('user', accessToken, { httpOnly: true, overwrite: true });
    res.cookie('refresh', refreshToken, { httpOnly: true, overwrite: true });
    res.status(200).json('success');
  } else {
    res.status(401).json('로그인 실패');
  }
});

// 관리자 로그아웃
router.post('/api/admin-logout', (req, res) => {
  res.cookie('user', '', { maxAge: 0 });
  res.cookie('refresh', '', { maxAge: 0 });
  res.status(200).json('로그아웃 성공');
});

// 관리자 체크
router.post('/api/admin-check', verifyTokens, (req, res) => {
  res.status(200).json('success');
});

module.exports = router;
