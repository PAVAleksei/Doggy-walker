const { model, Schema } = require('mongoose');

const DogSchema = new Schema({
	// Кличка собаки
	nickname: {
		type: String,
		required: true,
	},
	// Порода собаки
	breed: {
		type: String,
		required: true,
	},
	// Пол собаки
	gender: {
		type: String,
		required: true,
	},
	// Вес собаки
	weight: {
		type: Number,
		required: true,
	},
	// Тянет за поводок
	pullsTheLeash: {
		type: String,
		required: true,
	},
	// Контакт с другими собаками
	contactWithOther: {
		type: Boolean,
		required: true,
	},
	// Длительность прогулки
	duration: {
		type: Number,
		required: true,
	},
	// Отпускать на собачьей площадке
	letGo: {
		type: Boolean,
		required: true,
	},
	// Фото собакена
	avatar: {
		type: String,
	},
},
	{ timestamps: true });

module.exports = {
	Dog: model('Dog', DogSchema),
};
