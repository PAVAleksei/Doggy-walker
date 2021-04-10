const router = require('express').Router();
const { User } = require('../db/models/user.model');

router.get('/checkAuth', async (req, res) => {
  if (req.user) {
    const userId = req.session.passport.user;
    console.log(userId, 'userId');
    const user = await User.findById(userId);
    res.json(user);
  }
});
module.exports = router;
