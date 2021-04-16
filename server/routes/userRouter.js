/* eslint-disable consistent-return */
const router = require('express').Router();
const multer = require('multer');
const { User } = require('../db/models/user.model');
// const { Order } = require('../db/models/order.model');
const { Dog } = require('../db/models/dog.model');
const uploadMulter = require('../config/multer');

router.get('/checkAuth', async (req, res) => {
	if (req.user) {
		const userId = req.session.passport.user;
		const user = await User.findById(userId).populate('orders').populate('animal');
		const dog = await Dog.findById(userId).populate('owner');
		console.log({email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			kind: user.kind,
			verification: user.verification,
			dogcoins: user.dogcoins,
			district: user.district,
			orders: user.orders,
			animal: user.animal,
			photo: user.photo,
			telegram: user.telegram,});
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

			telegram: user.telegram,
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

router.post('/avatar', uploadMulter.single('file'), async (req, res) => {
	try {
		if (!req.file) {
			res.send('File was not found');
			return;
		}
		const { filename } = req.file;
		const user = await User.findById(req.user._id);
		const imgPuth = 'http://127.0.0.1:3001/img/';
		user.photo = imgPuth + filename;
		await user.save();
		return res.json(user.photo);
	} catch (e) {
		console.log(e, 'from userRouter');
		return res.status(400).json({ message: 'Upload avatar error' });
	}
});

module.exports = router;
