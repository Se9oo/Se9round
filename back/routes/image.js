const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

try {
  // uploads 폴더 있는지 검사
  fs.accessSync('uploads');
} catch (error) {
  // 폴더가 없으면 uploads 폴더 생성
  fs.mkdirSync('uploads');
}

const upload = multer({
  // TODO 이미지 저장 서버 확인
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    // 파일명 세팅 (파일명 + 생성시간 + 확장자)
    filename(req, file, done) {
      const ext = path.extname(file.originalname); //확장자 추출(.png)
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  // 파일 용량 제한
  limits: { fileSize: 20 * 1024 * 1024 },
});

// 이미지 저장
router.post('/api/image', upload.single('image'), async (req, res) => {
  if (req.file) {
    res.json(req.file.filename);
  } else {
    res.json.status(500).json('error');
  }
});

module.exports = router;
