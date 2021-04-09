const router = require('express').Router();
const authenticated = require('./middleware');
const { Order }= require('../db/models/order.model');
const { Dog } = require('../db/models/dog.model');


// все заказы /api/orders

router.get('/orders', async(req, res) => {
  
  try {
    const orders = await Order.find();

    setTimeout(() => {
      return res.json(orders);
    }, 500)
    
  } catch (error) {
    console.log('Error to receive orders from mongo');
    return res.sendStatus(500);
  }
})


// orders конкретного заказчика /api/:userid/orders

router.get('/:userid/orders', async(req, res) => {
  
  try {
    const orders = await Order.find({ clientId: userid });

    setTimeout(() => {
      return res.json(orders);
    }, 500)
    
  } catch (error) {
    console.log('Error to receive orders from mongo');
    return res.sendStatus(500);
  }
})


// add

router.post('/:userid/orders', async (req,res) => {

  const { description,
          dogName,
          price,
          date
        } = req.body;

  const dogId = (await Dog.findOne({ nickname: dogName }))._id;

  try {
    await Order.create({
      description,
      clientId: req.params.userid,
      dogId,  
      price,
      date,
      completed: false,
    });

    const order = await Order.findOne({ task: req.body.text});

    // setTimeout(() => {
    return res.json(order);
    // }, 500)

  } catch (error) {
    return res.sendStatus(501);
  }

})

// edit
router.patch('/:userid/orders', (req, res) => {


  
})



module.exports = router;
