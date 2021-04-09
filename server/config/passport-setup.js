const bcrypt = require('bcrypt');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../db/models/user.model');

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const authUser = async (req, email, password, done) => {
  try {
    if (/login/.test(req.path)) {
      const user = await User.findOne({ email }).lean().exec();
      console.log(user);
      if (!user)
        return done(null, false, { message: 'Неверный логин или пароль' });
      if (await bcrypt.compare(password, user.password)) return done(null, user);
      return done(null, false, { message: 'Неверный логин или пароль' });
    }
    if ((email && password && req.body.firstname, req.body.lastname, req.body.kind)) {
      const user = await User.findOne({ email }).lean().exec();
      if (!user) {
        try {
          const hashPass = await bcrypt.hash(password, 10);
          const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email,
            kind: req.body.kind,
            password: hashPass,
          });
          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(null, false, { message: 'Error' });
        }
      } else {
        return done(null, false, { message: 'Mail is already used' });
      }
    }
    return done(null, false, { message: 'Error' });
  } catch (error) {
    done(error);
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    authUser,
  ),
);

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have this user
        // console.log('user is: ', currentUser)
        done(null, currentUser);
      } else {
        // if not, create user in our db
        new User({
          googleId: profile.id,
          googleName: profile.displayName,
        }).save().then((newUser) => {
          // console.log('created new user: ', newUser)
          done(null, newUser);
        });
      }
    });
  }),
);
