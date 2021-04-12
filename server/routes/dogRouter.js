const router = require('express').Router();
const { Dog } = require('../db/models/dog.model');
const { User } = require('../db/models/user.model');

router.post('/', async (req, res) => {
  if (req.user) {
    try {
      const owner = req.user._id;
      const newDog = await Dog.create({ ...req.body.newDog, owner });
      const user = await User.findByIdAndUpdate(owner, { $push: { animal: newDog } });
      res.status(200).json(newDog);
    } catch (error) {
      console.log(error);
    }
  }
});

router.get('/', async (req, res) => {
  const dogs = await Dog.find();
  res.json(dogs);
});

router.get('/:id', async (req, res) => {
  const dog = await Dog.findById(req.params.id);
  res.json(dog);
});

router.post('/:id', async (req, res) => {
  const dogs = await Dog.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
  res.json(dogs);
});

router.delete('/:id', async (req, res) => {
  console.log(req.params, 'hfhfhfh');
  await Dog.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
