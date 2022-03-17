const express = require('express');
// db pool
const pool = require('../config/db');
// middlewares
const { verifyTokens } = require('../middlewares/auth');
const { requestValueCheck } = require('../middlewares/paramCheck');
// query
const {
  selectPostLists,
  insertPost,
  updatePostClickCount,
  selectPostByTitle,
  selectIsExistPost,
  cancelPost,
  modifyPost,
  selectRelatedPostsByTags,
  selectSearchPosts,
} = require('../query/post');
const { insertTag } = require('../query/tag');
// router
const router = express.Router();

// 게시글 상태 변수
const POST_CANCEL_STATUS = 0;
const POST_OK_STATUS = 1;
const POST_TEMP_STATUS = 2;

// 게시글 조회
router.get('/api/posts', async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query(selectPostLists, [POST_OK_STATUS]);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  } finally {
    client.release();
  }
});

// 게시글 등록
router.post('/api/post', verifyTokens, requestValueCheck, async (req, res) => {
  const client = await pool.connect();

  try {
    const { title, tagsArray, contents, thumbNail, subTitle } = req.body.data;

    // 중복 게시글 존재 여부 체크
    const result = await client.query(selectIsExistPost, [POST_OK_STATUS, title]);

    const count = result.rows[0].count;

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
      await client.query(insertPost, [title, contents, tagsArray, thumbNail, subTitle, POST_OK_STATUS]);

      res.status(200).json('success');
    }
  } catch (err) {
    res.status(500).json(error);
  } finally {
    client.release();
  }
});

// 게시글 임시 저장
router.post('/api/post/temp', verifyTokens, requestValueCheck, async (req, res) => {
  const client = await pool.connect();

  try {
    const { title, tagsArray, contents, thumbNail, subTitle } = req.body.data;
    // 중복 게시글 존재 여부 체크
    const result = await client.query(selectIsExistPost, [POST_OK_STATUS, title]);

    const count = result.rows[0].count;

    // 게시글 중복된 경우
    if (count > 0) {
      res.status(500).json('중복된 게시글이 존재합니다.');
    } else {
      // 게시글 임시 저장
      await client.query(insertPost, [title, contents, tagsArray, thumbNail, subTitle, POST_TEMP_STATUS]);

      res.status(200).json('success');
    }
  } catch (err) {
    res.status(500).json(err);
  } finally {
    client.release();
  }
});

// 게시글 조회수 add
router.post('/api/post/count', requestValueCheck, async (req, res) => {
  const client = await pool.connect();

  try {
    const { postId } = req.body.data;

    await client.query(updatePostClickCount, [postId]);

    res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  } finally {
    client.release();
  }
});

// 특정 게시글 조회
router.get('/api/post', requestValueCheck, async (req, res) => {
  const client = await pool.connect();

  try {
    const { postTitle } = req.body;

    const result = await client.query(selectPostByTitle, [postTitle]);

    if (result.rowCount === 0) {
      res.status(500).json('해당 게시글은 존재하지 않습니다.');
    } else {
      const postInfo = result.rows[0];
      const tags = postInfo.tags;
      // 관련 게시글 표시 수
      const FIND_POSTS_COUNT = 3;

      // 관련 게시글 초기화
      postInfo.relatedPosts = [];

      // 게시글 태그로 관련 게시글 찾기
      if (tags.length > 0) {
        const relatedPostQuery = selectRelatedPostsByTags(tags, postInfo.id, FIND_POSTS_COUNT, POST_OK_STATUS);

        // 관련 게시글 조회
        const relatedPosts = await client.query(relatedPostQuery);

        if (relatedPosts.rowCount > 0) {
          postInfo.relatedPosts = relatedPosts.rows;
        }
      }

      res.status(200).json(postInfo);
    }
  } catch (err) {
    res.status(500).json(err);
  } finally {
    client.release();
  }
});

// 게시글 취소
router.post('/api/post/cancel', verifyTokens, requestValueCheck, async (req, res) => {
  const client = await pool.connect();

  try {
    const { postId } = req.body.data;

    await client.query(cancelPost, [postId, POST_CANCEL_STATUS]);

    res.status(200).json({ postId });
  } catch (err) {
    res.status(500).json(err);
  } finally {
    client.release();
  }
});

// 게시글 수정
router.post('/api/post/modify', verifyTokens, requestValueCheck, async (req, res) => {
  const client = await pool.connect();

  try {
    const { title, tagsArray, contents, thumbNail, subTitle } = req.body.data;

    // 태그 저장
    if (Array.isArray(tagsArray) && tagsArray.length !== 0) {
      tagsArray.map((tag) => {
        client.query(insertTag, [tag]);
      });
    }

    await client.query(modifyPost, [title, tagsArray, contents, thumbNail, subTitle, POST_OK_STATUS]);

    res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  } finally {
    client.release();
  }
});

// 게시글 찾기
router.get('/api/posts/search', requestValueCheck, async (req, res) => {
  const client = await pool.connect();

  try {
    const { q } = req.query;
    const decodedQuery = decodeURI(q);
    const decodedLikeParam = `%${decodedQuery}%`;

    const result = await client.query(selectSearchPosts, [POST_OK_STATUS, decodedLikeParam, decodedQuery]);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  } finally {
    client.release();
  }
});

module.exports = router;
