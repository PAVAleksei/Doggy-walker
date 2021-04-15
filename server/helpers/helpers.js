const { User } = require('../db/models/user.model');

const getOrCreateUser = async (telegramId, username) => {

	try {
		let user = await User.findOne({ telegram: username });
		console.log('user ---->> ', user);
		if (user) {
			user.telegramid = telegramId;
			// console.log(user, '<------- user');
			return user;
		}

	} catch (error) {
		console.log(error, 'from helpers.js');
	}

};

module.exports = { getOrCreateUser }
