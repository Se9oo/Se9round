const express = require('express');
// db client
const client = require('../config/db');
const { verifyTokens } = require('../middlewares/auth');
// query
const {
  selectPostLists,
  insertPost,
  updatePostClickCount,
  selectPostByTitle,
  selectIsExistPost,
  cancelPost,
} = require('../query/post');
const { insertTag } = require('../query/tag');
// router
const router = express.Router();

// 게시글 상태 변수
const POST_CANCEL_STATUS = 0;
const POST_OK_STATUS = 1;
const POST_TEMP_STATUS = 2;

// db connect
client.connect((err) => {
  if (err) {
    console.log(`Failed to connect DB ${err}`);
  } else {
    console.log(`Connect to DB`);
  }
});

// 게시글 조회
router.get('/api/posts', (req, res) => {
  client.query(selectPostLists, [POST_OK_STATUS], (error, response) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(response.rows);
    }
  });
});

// 게시글 등록
router.post('/api/post', async (req, res) => {
  try {
    if (!req.body) {
      res.status(500).json('empty request');
    } else {
      const { title, tagsArray, contents, thumbNail, subTitle } = req.body.data;

      // 중복 게시글 존재 여부 체크
      const result = await client.query(selectIsExistPost, [POST_OK_STATUS, title]);

      const count = result.rows[0].count;

      // 게시글 중복된 경우
      if (count > 0) {
        res.status(500).json('중복된 게시글이 존재합니다.');
      } else {
        // 중복되지 않은 경우
        // 태그 저장
        if (Array.isArray(tagsArray) && tagsArray.length !== 0) {
          tagsArray.map((tag) => {
            client.query(insertTag, [tag]);
          });
        }
        // 게시글 저장
        client.query(
          insertPost,
          [title, contents, tagsArray, thumbNail, subTitle, POST_OK_STATUS],
          (error, response) => {
            if (error) {
              res.status(500).json(error);
            } else {
              res.status(200).json('success');
            }
          }
        );
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 게시글 임시 저장
router.post('/api/post/temp', async (req, res) => {
  try {
    if (!req.body) {
      res.status(500).json('empty request');
    } else {
      const { title, tagsArray, contents, thumbNail, subTitle } = req.body.data;
      // 중복 게시글 존재 여부 체크
      const result = await client.query(selectIsExistPost, [POST_OK_STATUS, title]);

      const count = result.rows[0].count;

      // 게시글 중복된 경우
      if (count > 0) {
        res.status(500).json('중복된 게시글이 존재합니다.');
      } else {
        // 게시글 임시 저장
        client.query(
          insertPost,
          [title, contents, tagsArray, thumbNail, subTitle, POST_TEMP_STATUS],
          (error, response) => {
            if (error) {
              res.status(500).json(error);
            } else {
              res.status(200).json('success');
            }
          }
        );
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 게시글 조회수 add
router.post('/api/post/count', (req, res) => {
  try {
    if (!req.body) {
      res.status(500).json('empty request');
    } else {
      const { postId } = req.body.data;

      client.query(updatePostClickCount, [postId], (error, response) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.status(200).json('success');
        }
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 특정 게시글 조회
router.get('/api/post', (req, res) => {
  try {
    if (!req.body) {
      res.status(500).json('empty request');
    } else {
      const { postTitle } = req.body;

      client.query(selectPostByTitle, [postTitle], (error, response) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.status(200).json(response.rows[0]);
        }
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 게시글 취소
router.post('/api/post/cancel', verifyTokens, (req, res) => {
  try {
    if (!req.body) {
      res.status(500).json('empty request');
    } else {
      const { postId } = req.body.data;

      client.query(cancelPost, [postId, POST_CANCEL_STATUS], (error, response) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.status(200).json({ postId });
        }
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
