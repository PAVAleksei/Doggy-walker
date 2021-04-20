const { model, Schema } = require('mongoose');

const DogSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  pullsTheLeash: {
    type: String,
    required: true,
  },
  contactWithOther: {
    type: String,
    required: true,
  },
  phobia: {
    type: String,
    required: true,
  },
  letGo: {
    type: String,
    required: true,
  },
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
