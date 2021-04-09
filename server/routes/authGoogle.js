const passport = require('passport');
const express = require('express');

const router = express.Router();

router.post('/register', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(info.message);
    }
    if (!user) {
      return res.send(info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(info.message);
      }
      req.session.user = user._id;
      return res.sendStatus(200);
    });
  })(req, res, next);
});

router.post('/login', passport.authenticate("local", { failureRedirect: "/profile" }),
  function (req, res) {
    // console.log("from login post", req.user);
    res.json({ name: req.user.name, layout: req.user.layout });
  });

// // auth logout
router.get('/logout', async (req, res) => {
  await req.logout();
  res.clearCookie(req.app.get('cookieName'));
  res.redirect('http://localhost:3000/register').sendStatus(200);
});

// auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000');
});

module.exports = router;
