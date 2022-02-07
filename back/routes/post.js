const express = require('express');
// db client
const client = require('../config/db');
// query
const { selectPostLists, insertPost, updatePostClickCount } = require('../query/post');
const { insertTag } = require('../query/tag');
// router
const router = express.Router();

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
  client.query(selectPostLists, (error, response) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(response.rows);
    }
  });
});

// 게시글 등록
router.post('/api/post', (req, res) => {
  if (!req.body) {
    res.status(500).json('empty request');
  } else {
    const { title, tagsArray, contents, thumbNail, subTitle } = req.body.data;

    // 태그 저장
    if (Array.isArray(tagsArray) && tagsArray.length !== 0) {
      try {
        tagsArray.map((tag) => {
          client.query(insertTag, [tag]);
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }

    // 게시글 저장
    client.query(insertPost, [title, contents, tagsArray, thumbNail, subTitle], (error, response) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json('success');
      }
    });
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

module.exports = router;
