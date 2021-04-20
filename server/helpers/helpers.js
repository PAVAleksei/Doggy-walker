const { User } = require('../db/models/user.model');

const getOrCreateUser = async (telegramId, username) => {
  try {
    const user = await User.findOne({ telegram: username });
    if (user) {
      user.telegramid = telegramId;
      return user;
    }
  } catch (error) {
    console.log(error, 'from helpers.js');
  }
};

module.exports = { getOrCreateUser };
