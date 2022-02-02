const express = require('express');
// db client
const client = require('../config/db');
// query
const { selectPostLists } = require('../query/post');
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
      throw error;
    } else {
      res.status(200).json(response.rows);
    }
  });
});

module.exports = router;
