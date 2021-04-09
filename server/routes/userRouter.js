const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models/user.model');

const saltRound = 10;

//регистрация
 
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (email && password && name) {
    const hashPassword = await bcrypt.hash(password, saltRound);
    const newUser = await User.create({
      email,
      hashPassword,
      name,
    });

    req.session.user = {
      id: newUser._id,
    };

    return res.sendStatus(200);
  }
  return res.sendStatus(418);
});

// логин

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)
  if (email && password) {
    const currentUser = await User.findOne({ email });
    // console.log({ currentUser })
    if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
      req.session.user = {
        id: currentUser._id,
      };

      return res.sendStatus(200);
    }
    return res.sendStatus(418);
  }
  return res.sendStatus(418);
});

module.exports = router;
