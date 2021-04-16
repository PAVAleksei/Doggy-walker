const router = require('express').Router();
const multer = require('multer');
const { Dog } = require('../db/models/dog.model');
const { User } = require('../db/models/user.model');
const uploadMulter = require('../config/multer');

router.post('/', async (req, res) => {

	if (req.user) {
		try {
			const owner = req.user._id;
			const newDog = await Dog.create({ ...req.body.newDog, owner });
			const user = await User.findByIdAndUpdate(owner, { $push: { animal: newDog } });
			res.status(200).json(newDog);
		} catch (error) {
			console.log(error, 'from gogRouter');
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
	// console.log(req.params, 'hfhfhfh');
	await Dog.findByIdAndDelete(req.params.id);
	res.sendStatus(200);
});

router.post('/avatar/:id', uploadMulter.single('file'), async (req, res) => {
	try {
		if (!req.file) {
			res.send('File was not found');
			return;
		}
		const { filename } = req.file;
		const dog = await Dog.findById(req.params.id);
		const imgPuth = 'http://127.0.0.1:3001/img/';
		dog.avatar = imgPuth + filename;
		await dog.save();
		return res.json({ avatar: dog.avatar, id: dog._id });
	} catch (e) {
		console.log(e, 'from dogRouter post avatar/:id');
		return res.status(400).json({ message: 'Upload avatar error' });
	}
});

module.exports = router;
