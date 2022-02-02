exports.selectPostLists = `
  SELECT
    *
  FROM
    post
  WHERE
    status = 1
  ORDER BY id DESC
`;
