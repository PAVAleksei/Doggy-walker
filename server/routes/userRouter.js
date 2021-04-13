const router = require("express").Router();
const { User } = require("../db/models/user.model");
// const { Order } = require('../db/models/order.model');
const { Dog } = require("../db/models/dog.model");

router.get("/checkAuth", async (req, res) => {
  if (req.user) {
    const userId = req.session.passport.user;
    const user = await User.findById(userId).populate('orders').populate('animal');
    const dog = await Dog.findById(userId).populate('owner');
    res.json({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      kind: user.kind,
      verification: user.verification,
      dogcoins: user.dogcoins,
      district: user.district,
      orders: user.orders,
      animal: user.animal,
      photo: user.photo,
    });
  }
});

router.post('/edit', async (req, res) => {
  if (req.user) {
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId, { ...req.body }, { new: true }).populate('orders').populate('animal');
    res.json(user);
  }
});
module.exports = router;[]
