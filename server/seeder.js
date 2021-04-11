const { connection } = require("mongoose");
// const dbConnect = require('./connect/dbConnect');
const app = require('./app')
const { User } = require('./db/models/user.model')

const seeder = async () => {
  // dbConnect();
  app.listen();

  const user = [
    {
      title: 'Ваня',
      district: 'Сокольники',
    },
    {
      title: 'Игорь',
      district: 'Текстильщики'
    },
    {
      title: 'Юля',
      district: 'Таганский'
    },
    {
      title: 'Семён',
      district: 'Арбат'
    },
    {
      title: 'Тарас',
      district: 'Тверской',
    },
  ];

  await User.insertMany(user)
  await connection.close();
}

seeder()
