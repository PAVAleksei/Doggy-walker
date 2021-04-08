const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    executorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    price: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: () => Date.now(),
      min: () => Date.now() + 1 * 2 * 60 * 60 * 1000,
      max: () => Date.now() + 100 * 24 * 60 * 60 * 1000,
    },
  },
  { timestamps: true },
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
