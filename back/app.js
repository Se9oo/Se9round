const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/post');

const app = express();

// cors 설정
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// router 연결
app.use(postRouter);

app.listen(3065, () => {
  console.log('서버 실행!');
});
