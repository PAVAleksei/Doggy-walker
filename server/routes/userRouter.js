// const router = require('express').Router();
// const bcrypt = require('bcrypt');
// const { User } = require('../db/models/user.model');

// const saltRound = 10;

// router.post('/signup', async (req, res) => {
//   const { email, password, name } = req.body;
//   if (email && password && name) {
//     const hashPassword = await bcrypt.hash(password, saltRound);
//     const newUser = await User.create({
//       email,
//       hashPassword,
//       name,
//     });

//     req.session.user = {
//       id: newUser._id,
//     };

//     return res.sendStatus(200);
//   }
//   return res.sendStatus(418);
// });

// router.post('/signin', async (req, res) => {
//   const { email, password } = req.body;
//   // console.log(req.body)
//   if (email && password) {
//     const currentUser = await User.findOne({ email });
//     // console.log({ currentUser })
//     if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
//       req.session.user = {
//         id: currentUser._id,
//       };

//       return res.sendStatus(200);
//     }
//     return res.sendStatus(418);
//   }
//   return res.sendStatus(418);
// });

// const router = require("express").Router();
// const passport = require("passport");
// ​
// router.post("/register", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(info.message);
//     }
//     if (!user) {
//       return res.send(info.message);
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(info.message);
//       }
//       req.session.user = user._id;
//       return res.sendStatus(200);
//     });
//   })(req, res, next);
// });
// ​
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return res.send(info.message);
//     }
//     if (!user) {
//       return res.send(info.message);
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return res.send(info.message);
//       }
//       req.session.user = user._id;
//       return res.json({ name: user.name });
//     });
//   })(req, res, next);
// });
// ​
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: "email",
//   })
// );
// ​
// router.get("/google/callback", (req, res, next) => {
//   passport.authenticate("google", (err, user, info) => {
//     if (err) {
//       return res.sendStatus(500);
//     }
//     if (!user) {
//       return res.sendStatus(400);
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return res.sendStatus(400);
//       }
//       req.session.user = user._id;
//       return res.json(user);
//     });
//   })(req, res, next);
// });
// ​
// router.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.clearCookie(req.app.get("cookieName")).sendStatus(200);
// });
// ​
// module.exports = router;
