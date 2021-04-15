const { Markup } = require('telegraf')

function getMainMenu() {
	return Markup.keyboard([
		['Авторизоваться'],
	]).resize().extra()
}

module.exports = {getMainMenu}
