function authenticated(req,res,next) {
  if (req.user._id) {
    return next();
  }
  res.sendStatus(401);
}

module.exports = authenticated;
