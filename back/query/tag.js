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
