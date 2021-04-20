/* eslint-disable max-len */
require('dotenv').config();
const passport = require('passport');
const express = require('express');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const { connect } = require('mongoose');
const cors = require('cors');
const Telegraf = require('telegraf');
const fetch = require('node-fetch');
const passportSetup = require('./config/passport-setup');

const { Stage, session } = Telegraf;
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authGoogle');
const orderRouter = require('./routes/orderRouter');
const dogRouter = require('./routes/dogRouter');
const verificationRouter = require('./routes/verificationRouter');
const SceneGenerator = require('./Scenes/AuthScene');
const { getMainMenu } = require('./keyboards');

const currentScene = new SceneGenerator();
const numberScene = currentScene.genNumberScene();
const nameScene = currentScene.genNameScene();
const { getOrCreateUser } = require('./helpers/helpers');
const { User } = require('./db/models/user.model');

const PORT = process.env.PORT ?? 3000;
const map = new Map();
const app = express();
const bot = new Telegraf(process.env.TOKEN);
const stage = new Stage([numberScene, nameScene]);
const randomNumberForAuth = () => Math.ceil(Math.random() * 10000);
bot.use(session());
bot.use(stage.middleware());
bot.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log(error, 'From server app');
    await ctx.reply('Что-то пошло не так 😢, уже чиним🥷');
  }
});
bot.start(async (ctx) => {
  const { from: { id: telegramId, username } } = ctx.update.message;
  const user = await getOrCreateUser(telegramId, username);
  if (user) {
    ctx.reply(`Привет, ${username}!`);
  } else {
    ctx.reply('Неверно указан логин Telegram, необходимо перейти в личный кабинет, перейти в редактирование профиля и указать свой аккаунт в Telegtam, после заново ввести команду /start');
  }
  try {
    await user.save();
  } catch (error) {
    console.log(error, 'From app bot.start');
  }
});

bot.hears('да', (ctx) => {
  ctx.reply('gogogog');
});

bot.hears('Авторизоваться', (ctx) => {
  ctx.reply(1234);
  ctx.scene.enter('number');
});

bot.hears('id', (ctx) => {
  bot.telegram.sendMessage(ctx.message.chat.id,
    `Привет, ${ctx.message.from.first_name}\n`
    + `Твой id: ${ctx.message.from.id}`);
});

bot.on('text', (ctx) => {
  ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);
});
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.command('scenes', async (ctx) => {
  ctx.scene.enter('number');
});

app.set('cookieName', 'sid');
app.use(
  cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  }),
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  sessions({
    name: app.get('cookieName'),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONNECTION_CLOUD,
    }),
    cookie: {
      httpOnly: true,
      maxAge: 86400 * 1e3,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/api', orderRouter);
app.use('/api/v1/dog', dogRouter);
app.use('/verification', verificationRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
  connect(
    process.env.DB_CONNECTION_CLOUD,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => {
      console.log('Connection to database is successful.');
    },
  );
  bot.launch();
});
module.exports = app;
