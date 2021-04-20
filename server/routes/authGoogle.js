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
      return res.json({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        kind: user.kind,
        orders: user.orders,
        verification: user.verification,
        district: user.district,
        animal: user.animal,
      });
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.send(info.message);
    }
    if (!user) {
      return res.send(info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.send(info.message);
      }
      req.session.user = user._id;
      return res.json({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        kind: user.kind,
        orders: user.orders,
        verification: user.verification,
        district: user.district,
        orders: user.orders,
        animal: user.animal,
        photo: user.photo,
      });
      res.redirect('http://127.0.0.1:3000');
    });
  })(req, res, next);
});

router.get('/logout', async (req, res) => {
  await req.logout();
  res.clearCookie(req.app.get('cookieName'));
  res.redirect('http://127.0.0.1:3000');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://127.0.0.1:3000');
});

module.exports = router;
