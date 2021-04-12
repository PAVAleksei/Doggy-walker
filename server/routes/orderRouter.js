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

//Исполнитель откликнулся на ордер, меняем requested на true

router.patch("/orders/requested/:id", async (req, res) => {
  const currOrderId = req.params.id;
  try {
    const currOrder = await Order.findByIdAndUpdate(
      currOrderId,
      {
        requested: true,
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

router.post("/orders/inwork/:id", async (req, res) => {
  const currOrderId = req.params.id;
  try {
    const currOrder = await Order.findByIdAndUpdate(
      currOrderId,
      {
        inWork: true,
      },
      {
        new: true,
      }
    );
    return res.json(currOrder);
  } catch (error) {
    console.log("Error to update order|inWork| to true");
    return res.sendStatus(500);
  }
});

// orders конкретного заказчика /api/:userid/orders

router.get("/customer/orders", async (req, res) => {
  if (req.user) {
    const { userEmail } = req.body;

    try {
      const userId = await User.findOne({ email: userEmail });
      const orders = await Order.find({ clientId: userId });

      setTimeout(() => {
        return res.json(orders);
      }, 500);
    } catch (error) {
      console.log("Error to receive orders from mongo");
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

// add

router.post("/customer/orders", async (req, res) => {
  if (req.user) {
    const { selectedDate, description, addressToServer, curDog } = req.body;
    console.log("req.body", req.body);
    const userId = req.user._id;
    try {
      await Order.create({
        description: description,
        clientId: userId,
        address: addressToServer,
        dogId: curDog,
        // price,
        date: selectedDate,
        // completed: false,
      });

      const order = await Order.findOne({ description: description });

      const ordersId = (await Order.find({ clientId: userId })).map(
        (el) => el._id
      );
      // console.log(orders);
      // console.log(order);
      const user = await User.findByIdAndUpdate(userId, { orders: ordersId });
      // setTimeout(() => {
      // console.log(order);
      return res.json(order);
      // }, 500)
    } catch (error) {
      console.log("error");
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }

  // const dogId = (await Dog.findOne({ nickname: dogName }))._id;
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

module.exports = router;
