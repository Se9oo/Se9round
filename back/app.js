const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const postRouter = require('./routes/post');
const imageRouter = require('./routes/image');
const userRouter = require('./routes/user');
const tagRouter = require('./routes/tag');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://se9round.dev'],
    credentials: true,
  })
);

// body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 보안 라이브러리 적용, nginx 사용에 따른 proxy 설정
if (process.env.NODE_ENV === 'production') {
  app.use(hpp());
  app.use(helmet());
  app.set('trust proxy', 1);
  // cors 설정
  app.use(
    cors({
      origin: 'https://se9round.dev',
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credientials: true,
    })
  );
}

// cookie Parser
app.use(cookieParser());

// router 연결
app.use(postRouter);
app.use(imageRouter);
app.use(userRouter);
app.use(tagRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3065, () => {
  console.log('서버 실행!');
});
