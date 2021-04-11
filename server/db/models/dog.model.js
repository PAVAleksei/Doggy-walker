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
    type: String,
    required: true,
  },
  // Тянет за поводок
  pullsTheLeash: {
    type: String,
    required: true,
  },
  // Контакт с другими собаками
  contactWithOther: {
    type: String,
    required: true,
  },
  // Длительность прогулки
  phobia: {
    type: String,
    required: true,
  },
  // Отпускать на собачьей площадке
  letGo: {
    type: String,
    required: true,
  },
  // Фото собакена
  avatar: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
},
{ timestamps: true });

module.exports = {
  Dog: model('Dog', DogSchema),
};
