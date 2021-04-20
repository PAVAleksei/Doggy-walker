require('dotenv').config();
const router = require('express').Router();
const Telegraf = require('telegraf');
const authenticated = require('./middleware');
const { Order } = require('../db/models/order.model');
const { Dog } = require('../db/models/dog.model');
const { User } = require('../db/models/user.model');

const bot = new Telegraf(process.env.TOKEN);

// все заказы /api/orders

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({ requested: false });
    return res.json(orders);
  } catch (error) {
    console.log('Error to receive orders from mongo');
    return res.sendStatus(500);
  }
});

router.get('/customer/orders', async (req, res) => {
  if (req.user) {
    try {
      const orders = await Order.find({ clientId: req.user._id });
      return res.json(orders);
    } catch (error) {
      console.log('Error to receive orders from mongo');
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

router.patch('/orders/requested/:id', async (req, res) => {
  const userId = req.user._id;
  const currOrderId = req.params.id;

  const currOrder = await Order.findById(currOrderId);

  try {
    if (!currOrder.requested) {
      const newOrder = await Order.findByIdAndUpdate(
        currOrderId,
        {
          requested: !currOrder.requested,
          executorId: userId,
          status: 'Найден исполнитель',
        },
        {
          new: true,
        },
      );

      const UserOfCurrentOrder = await User.findById(currOrder.clientId);

      if (UserOfCurrentOrder.telegramid) {
        bot.telegram.sendMessage(
          Number(UserOfCurrentOrder.telegramid),
          `На Ваш заказ ${currOrder.description} появился отклик, посмотреть: http://127.0.0.1:3000/order/${currOrder._id}`,
        );
      }
      return res.json(newOrder);
    }
  } catch (error) {
    console.log('Error to update order|requested| to true');
    return res.sendStatus(500);
  }
});

router.patch('/orders/requestedChange/:id', async (req, res) => {
  const userId = req.user._id;
  const currOrderId = req.params.id;

  try {
    const currOrder = await Order.findById(currOrderId);
    const currExecutor = await User.findByIdAndUpdate(currOrder.executorId, {
      $pull: { orders: currOrder._id },
    });

    await Order.findByIdAndUpdate(currOrderId, {
      $set: { requested: false, status: 'Открыто' },
    });

    const newOrder = await Order.findByIdAndUpdate(
      currOrderId,
      {
        $unset: { executorId: '' },
      },
      {
        new: true,
      },
    );

    const executerUserOfCurrentOrder = await User.findById(currOrder.executorId);

    if (executerUserOfCurrentOrder.telegramid) {
      bot.telegram.sendMessage(
        Number(executerUserOfCurrentOrder.telegramid),
        `Заказ ${currOrder.description} был отклонён`,
      );
    }

    return res.json(newOrder);
  } catch (error) {
    console.log('Error to update order|requested| to true', error);
    return res.sendStatus(500);
  }
});

router.patch('/orders/inwork/:id', async (req, res) => {
  const currOrderId = req.params.id;
  const currOrder = await Order.findById(currOrderId);

  try {
    const newOrder = await Order.findByIdAndUpdate(
      currOrderId,
      {
        inWork: !currOrder.inWork,
        status: 'На выполнении',
      },
      {
        new: true,
      },
    );
    const executerUserOfCurrentOrder = await User.findById(currOrder.executorId);

    if (executerUserOfCurrentOrder.telegramid) {
      bot.telegram.sendMessage(
        Number(executerUserOfCurrentOrder.telegramid),
        `Заказ ${currOrder.description} был подтвержден, \n 🐶 ждёт Вас по адресу:📍${currOrder.address.name} \n в 🕰 ${currOrder.date} http://127.0.0.1:3000/order/${currOrder._id}`,
      );
    }
    return res.json(newOrder);
  } catch (error) {
    console.log('Error to update order|inWork| to true');
    return res.sendStatus(500);
  }
});

router.patch('/orders/completed/:id', async (req, res) => {
  const currOrderId = req.params.id;

  try {
    const currOrder = await Order.findByIdAndUpdate(
      currOrderId,
      {
        completed: true,
        status: 'Выполнено',
      },
      {
        new: true,
      },
    );

    setTimeout(() => { }, 60 * 1000);

    const UserOfCurrentOrder = await User.findById(currOrder.clientId);

    if (UserOfCurrentOrder.telegramid) {
      bot.telegram.sendMessage(
        Number(UserOfCurrentOrder.telegramid),
        `Ваш заказ ${currOrder.description} успешно выполнен 👍, подтвердить: http://127.0.0.1:3000/order/${currOrder._id}`,
      );
    }

    return res.json(currOrder);
  } catch (error) {
    console.log('Error to update order|requested| to true');
    return res.sendStatus(500);
  }
});

router.patch('/orders/closed/:id', (req, res) => {
  const currOrderId = req.params.id;

  async function closeFunc() {
    const closedOrder = Order.findByIdAndUpdate(
      currOrderId,
      {
        closed: true,
        status: 'Закрыто',
      },
      {
        new: true,
      },
    );

    try {
      const currentOrder = await Order.findById(currOrderId);
      const executorCurrentOrder = await User.findById(currentOrder.executorId);

      if (executorCurrentOrder.telegramid) {
        bot.telegram.sendMessage(
          Number(executorCurrentOrder.telegramid),
          `Заказ ${currentOrder.description} был закрыт, спасибо!`,
        );
      }
    } catch (error) {
      console.log(error, 'order close error');
    }

    return closedOrder;
  }
  if (req.user) {
    if (req.user.kind === 'Заказчик') {
      try {
        const order = closeFunc().then((order) => res.json(order));
      } catch (error) {
        console.log('Error to update order|closed| to true');
        return res.sendStatus(500);
      }
    }
  }
});

router.post('/customer/orders', async (req, res) => {
  if (req.user) {
    const {
      selectedDate,
      description,
      addressToServer,
      curDog,
      price,
    } = req.body;
    const userId = req.user._id;
    try {
      await Order.create({
        description,
        clientId: userId,
        address: addressToServer,
        dogId: curDog,
        price,
        date: selectedDate,
      });

      const order = await Order.findOne({ description });

      const ordersId = (await Order.find({ clientId: userId })).map(
        (el) => el._id,
      );

      const user = await User.findByIdAndUpdate(userId, { orders: ordersId });

      const allExecuterUsers = await User.find({ kind: 'Исполнитель' });

      allExecuterUsers.forEach((user) => {
        if (user.telegramid) {
          bot.telegram.sendMessage(
            Number(user.telegramid),
            `Появился новый заказ: ${order.description} \n по адресу:📍 ${order.address.name} \n http://127.0.0.1:3000/order/${order._id}`,
          );
        }
      });

      return res.json(order);
    } catch (error) {
      console.log(error, 'from orderRouter');
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

router.put('/customer/orders', async (req, res) => {
  try {
    const { id, editValue } = req.body;
    await Order.updateOne({ _id: id }, { $set: { task: editValue } });
    const updatedOrder = await Order.findById(id);

    return res.json(updatedOrder);
  } catch (error) {
    return res.sendStatus(501);
  }
});

router.patch('/customer/orders', async (req, res) => {
  try {
    const order = await Order.findById(req.body.id);
    await Order.findByIdAndUpdate(req.body.id, { completed: !order.completed });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(501);
  }
});

router.post('/executor/order', async (req, res) => {
  if (req.user) {
    const { id } = req.body;
    const userId = req.user._id;
    try {
      const currOrder = await Order.findById(id);
      const currUser = await User.findByIdAndUpdate(userId, {
        $push: { orders: currOrder },
      });
      return res.json(currOrder);
    } catch (error) {
      console.log(error, 'from orderRouter /executor/order');
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

module.exports = router;
