// 게시글 목록 조회
exports.selectPostLists = `
  SELECT
    id
    , title
    , contents
    , TO_CHAR(reg_dt, 'YYYY-MM-DD HH:MI') AS reg_dt
    , cancel_dt
    , status
    , tags
    , thumbnail
    , sub_title
    , click_count
  FROM
    post
  WHERE
    status = 1
  ORDER BY id DESC
`;

exports.selectIsExistPost = `
  SELECT
    count(*)
  FROM
    post
  WHERE
    status = 1
    AND title = $1
`;

// 게시글 등록
exports.insertPost = `
  INSERT INTO post
  (
    title
    , contents
    , reg_dt
    , status
    , tags
    , thumbnail
    , sub_title
  )
  VALUES
  (
    $1
    , $2
    , now()
    , 1
    , $3
    , $4
    , $5
  )
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
    , TO_CHAR(reg_dt, 'YYYY-MM-DD HH:MI') AS reg_dt
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
