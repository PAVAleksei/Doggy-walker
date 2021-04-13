const router = require("express").Router();
const authenticated = require("./middleware");
const { Order } = require("../db/models/order.model");
const { Dog } = require("../db/models/dog.model");
const { User } = require("../db/models/user.model");

// все заказы /api/orders

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({ requested: false });
    return res.json(orders);
  } catch (error) {
    console.log("Error to receive orders from mongo");
    return res.sendStatus(500);
  }
});

// orders конкретного заказчика /api/:userid/orders

router.get("/customer/orders", async (req, res) => {
  console.log("====orders", req);
  if (req.user) {
    try {
      const orders = await Order.find({ clientId: req.user._id });
      console.log(orders);
      return res.json(orders);
    } catch (error) {
      console.log("Error to receive orders from mongo");
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

//Исполнитель откликнулся на ордер, меняем requested на true

router.patch("/orders/requested/:id", async (req, res) => {
  const userId = req.user._id;
  const currOrderId = req.params.id;

  try {
    const currOrder = await Order.findById(currOrderId);
    const currUser = User.findById(userId);

    if (!currOrder.requested) {
      const newOrder = await Order.findByIdAndUpdate(
        currOrderId,
        {
          requested: !currOrder.requested,
          executorId: currUser._id,
        },
        {
          new: true,
        }
      );
    } else {
      const newOrder = await Order.findByIdAndUpdate(
        currOrderId,
        {
          $push: { requested: !currOrder.requested },
        },
        {
          $pull: { executorId: currUser._id },
        },
        {
          new: true,
        }
      );
    }

    return res.json(newOrder);
  } catch (error) {
    console.log("Error to update order|requested| to true");
    return res.sendStatus(500);
  }
});

//Исполнитель нажал кнопку выполнено на ордер, меняем completed на true

router.patch("/orders/completed/:id", async (req, res) => {
  // const userId = req.user._id;
  const currOrderId = req.params.id;

  try {
    // const currUser = User.findById(userId);
    const currOrder = await Order.findByIdAndUpdate(
      currOrderId,
      {
        completed: true,
      },
      {
        new: true,
      }
    );

    return res.json(currOrder);
  } catch (error) {
    console.log("Error to update order|requested| to true");
    return res.sendStatus(500);
  }
});

//Заказчик  подтвердил заявку на ордер, меняем inWork на true

router.patch("/orders/inwork/:id", async (req, res) => {
  const currOrderId = req.params.id;
  const currOrder = await Order.findById(currOrderId);

  try {
    const newOrder = await Order.findByIdAndUpdate(
      currOrderId,
      {
        inWork: !currOrder.inWork,
      },
      {
        new: true,
      }
    );
    return res.json(newOrder);
  } catch (error) {
    console.log("Error to update order|inWork| to true");
    return res.sendStatus(500);
  }
});

// Исполнитель выполнил работу, completed на true

router.patch("/orders/completed/:id", async (req, res) => {
  if (req.user) {
    const currOrderId = req.params.id;
    try {
      const currOrder = await Order.findByIdAndUpdate(
        currOrderId,
        {
          completed: true,
        },
        {
          new: true,
        }
      );
      return res.json(currOrder);
    } catch (error) {
      console.log("Error to update order|completed| to true");
      return res.sendStatus(500);
    }
  }
});

router.patch("/orders/closed/:id", async (req, res) => {
  if (req.user) {
    const currOrderId = req.params.id;
    try {
      const currOrder = await Order.findByIdAndUpdate(
        currOrderId,
        {
          closed: true,
        },
        {
          new: true,
        }
      );
      return res.json(currOrder);
    } catch (error) {
      console.log("Error to update order|closed| to true");
      return res.sendStatus(500);
    }
  }
});

// add

router.post("/customer/orders", async (req, res) => {
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
        description: description,
        clientId: userId,
        address: addressToServer,
        dogId: curDog,
        price,
        date: selectedDate,
      });

      const order = await Order.findOne({ description: description });

      const ordersId = (await Order.find({ clientId: userId })).map(
        (el) => el._id
      );

      const user = await User.findByIdAndUpdate(userId, { orders: ordersId });

      return res.json(order);
    } catch (error) {
      console.log("error");
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

// edit
router.put("/customer/orders", async (req, res) => {
  try {
    const { id, editValue } = req.body;
    await Order.updateOne({ _id: id }, { $set: { task: editValue } });
    const updatedOrder = await Order.findById(id);

    // setTimeout(() => {
    return res.json(updatedOrder);
    // }, 500)
  } catch (error) {
    return res.sendStatus(501);
  }
});

router.patch("/customer/orders", async (req, res) => {
  try {
    const order = await Order.findById(req.body.id);
    await Order.findByIdAndUpdate(req.body.id, { completed: !order.completed });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(501);
  }
});

router.post("/executor/order", async (req, res) => {
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
      console.log("error");
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

module.exports = router;
