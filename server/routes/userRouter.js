const router = require("express").Router();
const { User } = require("../db/models/user.model");

router.get("/checkAuth", async (req, res) => {
  if (req.user) {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    // console.log("==============>", user);
    res.json({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      kind: user.kind,
      verification: user.verification,
      dogcoins: user.dogcoins,
      district: user.district,
      orders: user.orders,
    });
  }
});
module.exports = router;
