const { model, Schema } = require('mongoose');

const OrderSchema = new Schema(
  {
    service: String,
    description: {
      type: String,
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    executorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    dogId: {
      type: Schema.Types.ObjectId,
      ref: 'Dog',
    },
    price: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
    },
    address: {
      name: String,
      coordinates: [],
    },
    requested: {
      type: Boolean,
      default: false,
    },
    inWork: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    closed: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'Открыто',
    },
  },
  { timestamps: true },
);

module.exports = {
  Order: model('orders', OrderSchema),
};
