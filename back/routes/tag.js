const express = require('express');
// db client
const pool = require('../config/db');

const { selectTagList } = require('../query/tag');

const router = express.Router();

// 태그 상태 변수
const TAG_CANCEL_STATUS = 0;
const TAG_OK_STATUS = 1;

router.get('/api/tags', async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query(selectTagList, [TAG_OK_STATUS]);

    const tags = result.rows.map((tag) => tag.name);

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(error);
  } finally {
    client.release();
  }
});

module.exports = router;
