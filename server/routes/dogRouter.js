const router = require('express').Router();
const { Dog } = require('../db/models/dog.model');

router.post('/', async (req, res) => {
  if (req.user) {
    try {
      const owner = req.user._id;
      const newDog = await Dog.create({ ...req.body.newDog, owner });
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

module.exports = router;
