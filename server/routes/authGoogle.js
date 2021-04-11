const passport = require("passport");
const express = require("express");

const router = express.Router();

router.post("/register", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
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
        orders: user.orders.populate('orders'),
        verification: user.verification,
      });
    });
  })(req, res, next);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
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
        orders: user.orders.populate('orders'),
        verification: user.verification,
      });
    });
  })(req, res, next);
});

router.get("/tes");

// // auth logout
router.get("/logout", async (req, res) => {
  await req.logout();
  res.clearCookie(req.app.get("cookieName"));
  res.redirect("http://localhost:3000/register");
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:3000");
});

// router.get("/google/redirect", (req, res) => {
//   passport.authenticate("google", (user) => {
//     res.json({
//       email: user.email,
//       firstname: user.firstname,
//       lastname: user.lastname,
//       kind: user.kind,
//       verification: user.verification,
//     });
//   });
// });

module.exports = router;
