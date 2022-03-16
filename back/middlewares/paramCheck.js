exports.requestBodyCheck = (req, res, next) => {
  if (!req.body) {
    res.status(500).json('empty request');
  } else {
    next();
  }
};
