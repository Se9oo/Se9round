exports.requestValueCheck = (req, res, next) => {
  try {
    if (
      !req ||
      (Object.keys(req.body).length === 0 &&
        Object.keys(req.params).length === 0 &&
        Object.keys(req.query).length === 0)
    ) {
      res.status(500).json('empty request');
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
