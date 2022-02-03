const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRouter = require('./routes/post');

const app = express();

// cors 설정
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router 연결
app.use(postRouter);

app.listen(3065, () => {
  console.log('서버 실행!');
});
