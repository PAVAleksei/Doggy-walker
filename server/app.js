/* eslint-disable max-len */
require('dotenv').config();
const passport = require('passport');
const express = require('express');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const { connect } = require('mongoose');
const cors = require('cors');
const passportSetup = require('./config/passport-setup');

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authGoogle');
const orderRouter = require('./routes/orderRouter');
const dogRouter = require('./routes/dogRouter');
const verificationRouter = require('./routes/verificationRouter');
const { User } = require('./db/models/user.model');



const PORT = process.env.PORT ?? 3000;

const map = new Map();
const app = express();

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

const sessionParser = sessions({
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
});

app.use(sessionParser);

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



const server = http.createServer(app);

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');
  console.log(request.session?.user);

  sessionParser(request, {}, () => {
    if (!request.session?.user?._id) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, function (ws) {
      wss.emit('connection', ws, request);
    });
  });
});

wss.on('connection', (ws, request) => {
  const { id: userId} = request.session.user;

  map.set(user, ws);

  ws.on('message', (message) => {
    //
    // const parseIncomingMessage = JSON.parse(message)
    // Here we can now use session parameters.
    //

    // async function ordersToClient() {
    //   const orders = await Order.find({ requested: false });
    //   return orders;
    // }
    
    // switch(parseIncomingMessage.type) {
    //   case 'greeting':
    //     // User.findById(userId).then((user) => {
    //       Order.find({ requested: false }).then((allOrders) => {
    //       for (const [id, clientConnection] of map) {
    //         if (clientConnection.readyState === WebSocket.OPEN) {
              
    //           const messageToUsers = { 
    //             type: parseIncomingMessage.type,
    //             payload: {
    //               user: user,
    //               allOrders: allOrders,
    //             }
    //           }
    //           clientConnection.send(JSON.stringify({ messageToUsers }));
    //         }
    //       } 
    //     })
    //     // })
    //     break
    
    //   // case 'newMessage': 
    //   //   Message.create({
    //   //     text: parseIncomingMessage.payload.message,
    //   //     id: userId,
    //   //   }).then((message) => {

    //   //   })


    //   default: 
    //     break
    

    

    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send('message from server');
    //   }
    // });
    console.log(`Received message ${message} from user ${userId}`);
  });

  ws.on('close', function () {
    map.delete(userId);
  });
});

server.listen(PORT, () => {
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
});

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}.`);

//   connect(
//     process.env.DB_CONNECTION_CLOUD,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     },
//     () => {
//       console.log('Connection to database is successful.');
//     },
//   );
// })

module.exports = app;
