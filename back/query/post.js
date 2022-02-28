// 게시글 목록 조회
exports.selectPostLists = `
  SELECT
    id
    , title
    , contents
    , TO_CHAR(reg_dt, 'YYYY-MM-DD HH24:MI') AS reg_dt
    , cancel_dt
    , status
    , tags
    , thumbnail
    , sub_title
    , click_count
  FROM
    post
  WHERE
    status = $1
  ORDER BY id DESC
`;

exports.selectIsExistPost = `
  SELECT
    count(*)
  FROM
    post
  WHERE
    status = $1
    AND title = $2
`;

// 게시글 등록
exports.insertPost = `
  INSERT INTO post
  (
    title
    , contents
    , reg_dt
    , tags
    , thumbnail
    , sub_title
    , status
  )
  VALUES
  (
    $1
    , $2
    , now()
    , $3
    , $4
    , $5
    , $6
  ) ON
  CONFLICT (title) DO
  UPDATE SET
    contents = $2
    , tags = $3
    , thumbnail = $4
    , sub_title = $5
    , status = $6
`;

// 게시글 조회수 add
exports.updatePostClickCount = `
  UPDATE post SET
    click_count = click_count + 1
  WHERE
    id = $1
`;

// 특정 게시글 조회
exports.selectPostByTitle = `
  SELECT
    id
    , title
    , contents
    , TO_CHAR(reg_dt, 'YYYY-MM-DD HH24:MI') AS reg_dt
    , cancel_dt
    , status
    , tags
    , thumbnail
    , sub_title
    , click_count
  FROM
    post
  WHERE
    title = $1
`;

// 게시글 취소
exports.cancelPost = `
  UPDATE post SET
    status = $2
  WHERE
    id = $1
`;

// 게시글 수정
exports.modifyPost = `
  UPDATE post SET
    tags = $2
    , contents = $3
    , thumbnail = $4
    , sub_title = $5
    , status = $6
  WHERE
    title = $1
`;
