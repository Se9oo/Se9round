const express = require('express');

const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

// 관리자 로그인
router.post('/api/admin-login', (req, res) => {
  if (!req.body) {
    res.status(500).json('empty request');
  } else {
    const { key } = req.body.data;

    if (key === process.env.LOGIN_KEY) {
      res.status(200).json('success');
    } else {
      res.status(401).json('로그인 실패');
    }
  }
});

// 관리자 로그아웃
router.post('/api/admin-logout', (req, res) => {
  res.status(200).json('로그아웃 성공');
});

module.exports = router;
