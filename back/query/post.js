// 게시글 목록 조회
exports.selectPostLists = `
  SELECT
    id
    , title
    , contents
    , TO_CHAR(reg_dt, 'YYYY-MM-DD') AS reg_dt
    , cancel_dt
    , status
    , tags
    , thumbnail
    , sub_title
  FROM
    post
  WHERE
    status = 1
  ORDER BY id DESC
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
