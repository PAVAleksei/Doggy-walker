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

// bot.use(Telegraf.log());

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

	// console.log('ctx----> ', ctx);
	// console.log('ctx.update ----> ', ctx.update.message.from);
	const { from: { id: telegramId, username } } = ctx.update.message;
	// console.log({telegramId});
	// console.log({username});
	const user = await getOrCreateUser(telegramId, username);
	// console.log('user', user);
	if (user) {
		ctx.reply('Привет, любитель собакенов!');
	} else {
		ctx.reply('Неверно указан логин Telegram');
	}
	try {
		await user.save();
	} catch (error) {
		console.log(error, 'From app bot.start');
	}
	// ctx.reply('Привет, любитель собакенов!');

});
// console.log(bot)

bot.hears('да', (ctx) => {
  // console.log(ctx.update.message.chat);
  // console.log(ctx);

  // fetch
  ctx.reply('gogogog');
  // ctx.scene.enter('number');
});
// bot.start((ctx) => {
// 	ctx.replyWithHTML(
// 		`Приветсвую тебя, ${ctx.message.from.first_name} в <b>Doggy-walker</b>\n\n` +
// 		`Для начала, пройди авторизацию`,
// 		getMainMenu());
// 	console.log(ctx.message.from.id);
// 	console.log(ctx.message.from.username);

// });

bot.hears('Авторизоваться', (ctx) => {
  ctx.reply(1234);
  ctx.scene.enter('number');
});

// -------- получить id пользователя -----------

bot.hears("id", (ctx) => {
	bot.telegram.sendMessage(ctx.message.chat.id,
		`Привет, ${ctx.message.from.first_name}\n` +
		`Твой id: ${ctx.message.from.id}`)

});
// ---------------------------------------------

bot.on('text', (ctx) => {
  ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);
	// console.log('role --> ', ctx.message);
});

bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.command('scenes', async (ctx) => {
  ctx.scene.enter('number');
});

// ===================================================================

// bot.hears('test', (ctx) => {
// 	// Explicit usage
// 	console.log(ctx.state);
// 	ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);

// Using context shortcut
// ctx.reply(`Hello ${ctx.state.role}`)
// });

//= =====================================================================

app.set('cookieName', 'sid');
// cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// app.use(express.static(path.join(process.env.PWD, "public")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  sessions({
    name: app.get('cookieName'),
    secret: process.env.SECRET_KEY,
    resave: false, // Не сохранять сессию, если мы ее не изменим
    saveUninitialized: false, // не сохранять пустую сессию
    store: MongoStore.create({
      // выбираем в качестве хранилища mongoDB
      mongoUrl: process.env.DB_CONNECTION_CLOUD,
    }),
    cookie: {
      // настройки, необходимые для корректного работы cookie
      httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
      maxAge: 86400 * 1e3, // устанавливаем время жизни cookie
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

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

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/api', orderRouter);
app.use('/api/v1/dog', dogRouter);
app.use('/verification', verificationRouter);

// app.use('/api/orders', orderRouter);

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





//======================================================================


app.set('cookieName', 'sid');
// cors
app.use(
	cors({
		origin: 'http://127.0.0.1:3000',
		credentials: true,
	}),
);

// app.use(express.static(path.join(process.env.PWD, "public")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
	sessions({
		name: app.get('cookieName'),
		secret: process.env.SECRET_KEY,
		resave: false, // Не сохранять сессию, если мы ее не изменим
		saveUninitialized: false, // не сохранять пустую сессию
		store: MongoStore.create({
			// выбираем в качестве хранилища mongoDB
			mongoUrl: process.env.DB_CONNECTION_CLOUD,
		}),
		cookie: {
			// настройки, необходимые для корректного работы cookie
			httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
			maxAge: 86400 * 1e3, // устанавливаем время жизни cookie
		},
	}),
);

app.use(passport.initialize());
app.use(passport.session());

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

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/api', orderRouter);
app.use('/api/v1/dog', dogRouter);
app.use('/verification', verificationRouter);

// app.use('/api/orders', orderRouter);




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

