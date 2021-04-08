const { model, Schema } = require('mongoose')

const OrderSchema = new Schema({
	description: {
		type: String,
		required: true
	},
	clientId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	executorId: {
		type: Schema.Types.ObjectId,
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

module.exports = {
	Order: model('Order', OrderSchema)
}
