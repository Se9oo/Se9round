// 태그 등록
exports.insertTag = `
  INSERT INTO tag
  (
    name
    , status
    , reg_dt
  )
  VALUES
  (
    $1
    , 1
    , now()
  )
  ON CONFLICT (name)
  DO UPDATE SET
    name = $1
    , status = 1
    , cancel_dt = NULL
`;

// 태그 목록 조회
exports.selectTagList = `
  SELECT
    name
  FROM
    tag
  WHERE
    status = $1
  ORDER BY reg_dt DESC
`;

// 태그 취소
exports.cancelTag = `
  UPDATE tag SET
    status = 0
    , cancel_dt = NOW()
  WHERE
    name = $1
`;
