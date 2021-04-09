function authenticated(req,res,next) {
  if (req.session.user.id) {
    return next();
  }
  res.sendStatus(401);
}

module.exports = authenticated;
