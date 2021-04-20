const router = require('express').Router();
const { User } = require('../db/models/user.model');

router.post('/', async (req, res) => {
  if (req.user) {
    const userId = req.session.passport.user;
    try {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verification: true,
        },
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error, 'from verificationRouter');
    }
  }
});

module.exports = router;
