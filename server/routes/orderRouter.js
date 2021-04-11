const router = require('express').Router();
const authenticated = require('./middleware');
const { Order } = require('../db/models/order.model');
const { Dog } = require('../db/models/dog.model');
const { User } = require('../db/models/user.model');

// все заказы /api/orders

router.get('/orders', async (req, res) => {

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

router.get('/customer/orders', async (req, res) => {

	const { userEmail } = req.body;
	try {
		const userId = await User.findOne({ email: userEmail });
		const orders = await Order.find({ clientId: userId });

		setTimeout(() => {
			return res.json(orders);
		}, 500)
	}
	catch (error) {
		console.log('Error to receive orders from mongo');
		return res.sendStatus(500);
	}
})


// add

router.post('/customer/orders', async (req, res) => {

	// console.log('======>');
	// console.log(req.body);
	const { selectedDate, description, addressToBack, userEmail } = req.body;
	const user = await User.findOne({ email: userEmail })
	const userId = user._id;


	// console.log(userId);

	// const { description,
	//         dogName,
	//         price,
	//         date
	//       } = req.body;

	// const dogId = (await Dog.findOne({ nickname: dogName }))._id;

	try {

		await Order.create({
			description: description,
			clientId: userId,
			address: addressToBack,
			// dogId,  
			// price,
			date: selectedDate,
			completed: false,
		});

		const order = await Order.findOne({ description: description });

		const ordersId = (await Order.find({ clientId: userId })).map(el => el._id);
		// console.log(orders);
		console.log(order);
		const user = await User.findByIdAndUpdate(userId, { orders: ordersId });
		// setTimeout(() => {
		console.log(user);
		return res.json(order);
		// }, 500)

	} catch (error) {
		console.log('error');
		return res.sendStatus(500);
	}

})

// edit
router.patch('/customer/orders', (req, res) => {



})



module.exports = router;
