const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const postRouter = require('./routes/post');
const imageRouter = require('./routes/image');
const userRouter = require('./routes/user');

const app = express();

// cors 설정
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookie Parser
app.use(cookieParser());

// router 연결
app.use(postRouter);
app.use(imageRouter);
app.use(userRouter);

app.use('/', express.static(path.join(__dirname, 'uploads')));

app.listen(3065, () => {
  console.log('서버 실행!');
});
