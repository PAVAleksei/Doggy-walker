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
///Это отрабатывает для экзикьютера
router.patch("/orders/requested/:id", async (req, res) => {
  const userId = req.user._id;
  const currOrderId = req.params.id;

  const currOrder = await Order.findById(currOrderId);

  // const currUser = User.findById(userId);
  try {
    if (!currOrder.requested) {
      const newOrder = await Order.findByIdAndUpdate(
        currOrderId,
        {
          requested: !currOrder.requested,
          executorId: userId,
          status: "Найден исполнитель",
        },
        {
          new: true,
        }
      );
      return res.json(newOrder);
    }
  } catch (error) {
    console.log("Error to update order|requested| to true");
    return res.sendStatus(500);
  }
});

//Заказчик  отклоняет заявку от исполнителя
router.patch("/orders/requestedChange/:id", async (req, res) => {
  const userId = req.user._id;
  const currOrderId = req.params.id;

  try {
    const currOrder = await Order.findById(currOrderId);
    const currExecutor = await User.findByIdAndUpdate(currOrder.executorId, {
      $pull: { orders: currOrder._id },
    });
    console.log(currExecutor);

    await Order.findByIdAndUpdate(currOrderId, {
      $set: { requested: false, status: "Открыто" },
    });

    const newOrder = await Order.findByIdAndUpdate(
      currOrderId,
      {
        $unset: { executorId: "" },
      },
      {
        new: true,
      }
    );

    return res.json(newOrder);
  } catch (error) {
    console.log("Error to update order|requested| to true", error);
    return res.sendStatus(500);
  }
});

//Заказчик подтвердил заявку на ордер, меняем inWork на true

router.patch("/orders/inwork/:id", async (req, res) => {
  const currOrderId = req.params.id;
  const currOrder = await Order.findById(currOrderId);

  try {
    const newOrder = await Order.findByIdAndUpdate(
      currOrderId,
      {
        inWork: !currOrder.inWork,
        status: "На выполнении",
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

//Исполнитель нажал кнопку выполнено на ордер, меняем completed на true

router.patch("/orders/completed/:id", async (req, res) => {
  const currOrderId = req.params.id;

  try {
    const currOrder = await Order.findByIdAndUpdate(
      currOrderId,
      {
        completed: true,
        status: "Выполнено",
      },
      {
        new: true,
      }
    );

    setTimeout(() => {}, 60 * 1000);

    return res.json(currOrder);
  } catch (error) {
    console.log("Error to update order|requested| to true");
    return res.sendStatus(500);
  }
});

router.patch("/orders/closed/:id", (req, res) => {
  const currOrderId = req.params.id;

  const closeFunc = async () => {
    const closedOrder = await Order.findByIdAndUpdate(
      currOrderId,
      {
        closed: true,
        status: "Закрыто",
      },
      {
        new: true,
      }
    );
    return closedOrder;
  };

  if (req.user) {
    if (req.user.kind === "Заказчик") {
      try {
        const order = closeFunc();
        return res.json(order);
      } catch (error) {
        console.log("Error to update order|closed| to true");
        return res.sendStatus(500);
      }
    }

    setTimeout(() => {
      try {
        const order = closeFunc();
        return res.json(order);
      } catch (error) {
        console.log("Error to update order|closed| to true by SetTimeout");
        return res.sendStatus(500);
      }
      // }, 4*60*60*1000);
    }, 60 * 1000);
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
