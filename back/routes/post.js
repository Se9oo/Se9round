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
  selectTagsByPostId,
  selectPostsCountWithTag,
  selectPostListCount,
  deletePost,
} = require('../query/post');
const { insertTag, cancelTag } = require('../query/tag');
// router
const router = express.Router();

// 게시글 상태 변수
const POST_CANCEL_STATUS = 0;
const POST_OK_STATUS = 1;
const POST_TEMP_STATUS = 2;

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

// 게시글 조회
router.get('/api/posts/:page', requestValueCheck, async (req, res) => {
  const client = await pool.connect();

  let { page } = req.params;

  if (page < 1) {
    page = 1;
  }

  const MAX_PAGE_ITEMS_COUNT = 4;
  const offset = parseInt(page) ? MAX_PAGE_ITEMS_COUNT * parseInt(page) - MAX_PAGE_ITEMS_COUNT : 0;

  try {
    const postList = await client.query(selectPostLists(true, MAX_PAGE_ITEMS_COUNT, offset), [POST_OK_STATUS]);
    const postCount = await client.query(selectPostListCount, [POST_OK_STATUS]);

    const pageCount = Math.ceil(parseInt(postCount.rows[0].cnt) / MAX_PAGE_ITEMS_COUNT);

    res.status(200).json({
      postList: postList.rows,
      pageInfo: { pageCount, postCount: parseInt(postCount.rows[0].cnt), page: parseInt(page) },
    });
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
      client.query('BEGIN');
      // 중복되지 않은 경우
      // 태그 저장
      if (Array.isArray(tagsArray) && tagsArray.length !== 0) {
        for (const tag of tagsArray) {
          await client.query(insertTag, [tag]);
        }
      }

      // 게시글 저장
      await client.query(insertPost, [title, contents, tagsArray, thumbNail, subTitle, POST_OK_STATUS]);

      client.query('COMMIT');
      res.status(200).json('success');
    }
  } catch (err) {
    client.query('ROLLBACK');
    res.status(500).json(err);
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
      await client.query('BEGIN');
      // 게시글 임시 저장
      await client.query(insertPost, [title, contents, tagsArray, thumbNail, subTitle, POST_TEMP_STATUS]);

      await client.query('COMMIT');

      res.status(200).json('success');
    }
  } catch (err) {
    await client.query('ROLLBACK');
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

    await client.query('BEGIN');

    await client.query(updatePostClickCount, [postId]);

    await client.query('COMMIT');

    res.status(200).json('success');
  } catch (err) {
    await client.query('ROLLBACK');
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

    // 취소할 게시글 태그 조회
    const cancelPostTags = await client.query(selectTagsByPostId, [postId]);

    // transaction
    await client.query('BEGIN');

    // 태그 존재할 경우
    if (cancelPostTags.rowCount > 0) {
      for (const tag of cancelPostTags.rows[0].tags) {
        const postCount = await client.query(selectPostsCountWithTag, [POST_OK_STATUS, tag, postId]);

        // 게시글이 없다면 태그 취소처리
        if (parseInt(postCount.rows[0].cnt) === 0) {
          await client.query(cancelTag, [tag]);
        }
      }
    }

    await client.query(cancelPost, [postId, POST_CANCEL_STATUS]);
    await client.query('COMMIT');

    res.status(200).json({ postId });
  } catch (err) {
    await client.query('ROLLBACK');
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

    await client.query('BEGIN');
    // 태그 저장
    if (Array.isArray(tagsArray) && tagsArray.length !== 0) {
      for (const tag of tagsArray) {
        await client.query(insertTag, [tag]);
      }
    }

    await client.query(modifyPost, [title, tagsArray, contents, thumbNail, subTitle, POST_OK_STATUS]);
    await client.query('COMMIT');

    res.status(200).json('success');
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json(err);
  } finally {
    client.release();
  }
});

// 임시 게시글 목록 조회
router.get('/api/manage/posts', async (req, res) => {
  const client = await pool.connect();

  try {
    const tempPostList = await client.query(selectPostLists(false, null, null), [POST_TEMP_STATUS]);
    const cancelPostList = await client.query(selectPostLists(false, null, null), [POST_CANCEL_STATUS]);

    res.status(200).json({ tempPostList: tempPostList.rows, cancelPostList: cancelPostList.rows });
  } catch (err) {
    res.status(500).json(err);
  } finally {
    client.release();
  }
});

// 게시글 영구 삭제
router.post('/api/post/delete', verifyTokens, requestValueCheck, async (req, res) => {
  const client = await pool.connect();

  try {
    const { postId } = req.body.data;

    await client.query('BEGIN');

    await client.query(deletePost, [postId]);

    await client.query('COMMIT');

    res.status(200).json({ postId });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json(err);
  } finally {
    client.release();
  }
});

module.exports = router;
