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

exports.selectTagList = `
  SELECT
    name
    , TO_CHAR(reg_dt, 'YYYY-MM-DD HH24:MI') AS reg_dt
  FROM
    tag
  WHERE
    status = $1
  ORDER BY reg_dt DESC
`;
