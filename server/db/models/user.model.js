const { model, Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    googleId: String,
    googleName: String,
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      default: '',
    },
    dogcoins: {
      type: Number,
      default: 0,
    },
    animal: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dog',
      },
    ],
    verification: {
      type: Boolean,
      default: false,
    },
    passportSeries: {
      type: String,
      default: 0,
    },

    passportNumber: {
      type: String,
      default: 0,
    },
    telegram: {
      type: String,
      default: '',
    },
    telegramid: {
      type: Number,
      default: null,
    },

    kind: {
      type: String,
      default: 'Заказчик',
    },
    district: [],
    avatar: {
      type: String,
    },
    specialization: {
      type: Array,
      default: [],
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'orders',
      },
    ],
  },
  { timestamps: true },
);

module.exports = {
  User: model('User', UserSchema),
};
