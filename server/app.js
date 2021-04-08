/* eslint-disable max-len */
require('dotenv').config();
const express = require('express');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const { connect } = require('mongoose');
const cors = require('cors');
// const createError = require('http-errors');

const app = express();

app.set('cookieName', 'sid');

app.use(cors());
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessions({
  name: app.get('cookieName'),
  secret: process.env.SECRET_KEY,
  resave: false, // Не сохранять сессию, если мы ее не изменим
  saveUninitialized: false, // не сохранять пустую сессию
  store: MongoStore.create({ // выбираем в качестве хранилища mongoDB
    mongoUrl: process.env.DB_CONNECTION,
  }),
  cookie: { // настройки, необходимые для корректного работы cookie
    httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
    maxAge: 86400 * 1e3, // устанавливаем время жизни cookie
  },
}));

// app.use(async (req, res, next) => {
//   const userId = req.session?.user?.id;
//   if (userId) {
//     const currentUser = await User.findById(userId);
//     if (currentUser) {
//       res.locals.name = currentUser.name;
//       res.locals.lastname = currentUser.lastname;
//       res.locals.middlname = currentUser.middlename;
//       res.locals.id = currentUser._id;
//       res.locals.admin = currentUser.role === 'admin';
//       res.locals.manager = currentUser.role === 'manager';
//     }
//   }
//   next();
// });

const PORT = process.env.PORT ?? 3000;

app.listen(
  PORT,
  () => {
    console.log(`Server started on port ${PORT}.`);

    connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }, () => {
      console.log('Connection to databse is successful.');
    });
  },
);

module.exports = app;
