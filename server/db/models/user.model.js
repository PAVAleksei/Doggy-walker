const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    googleId: String,
    googleName: String,
    // Имя пользователя
    firstname: {
      type: String,
      minlength: 2,
      // match: /^[A-Z]\w+$/i,
    },
    lastname: {
      type: String,
      minlength: 2,
      // match: /^[A-Z]\w+$/i,
    },
    // Мы не храним пароль, а только его хэш
    password: {
      type: String,
      minlength: 4,
    },
    // Email
    email: {
      type: String,
      unique: true,
      minlength: 3,
      // match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    dogcoins: {
      type: Number,
      default: 0,
    },
    animal: [{
      type: Schema.Types.ObjectId,
      ref: "Dog",
    }],
    // Заказчик или исполнитель
    kind: {
      type: String,
      role: String,
      verification: Boolean,
    },
    // Район выгула собаки
    district: {
      type: String,
    },
    avatar: {
      type: String,
    },
    specialization: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = {
  User: model('User', UserSchema),
};
