const router = require('express').Router();
const authenticated = require('./middleware');
const Order = require('../db/models/order.model')

// заказы конкретного заказчика
router.get('/', async(req, res) => {
  
  try {
    const orders = await Order.find();

    setTimeout(() => {
      return res.json(todos);
    }, 500)
    
  } catch (error) {
    console.log('Error to receive todos from mongo');
    return res.sendStatus(500);
  }
})
