const passport = require('passport');
const express = require('express');

const router = express.Router();

// // auth logout
router.get('/logout', async (req, res) => {
  await req.logout();

  res.clearCookie(req.app.get('cookieName'));

  // req.session.destroy((err) => {
  //   if (err) return res.redirect('http://localhost:3000/register');

  //   res.clearCookie('cookieName');
  //   return res.redirect('http://localhost:3000/register');
  // });

  res.redirect('http://localhost:3000/register');
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
