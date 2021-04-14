const {User} = require('../db/models/user.model');

const getOrCreateUser = async (telegramId, username) => {
	let user = await User.findOne({ telegram: username });
	console.log('user ---->> ', user );
  if (user) {
		user.telegramid = telegramId;
		console.log(user, '<------- user');
		return user;
  }
};

module.exports = { getOrCreateUser }
