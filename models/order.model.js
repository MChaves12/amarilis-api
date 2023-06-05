const { model, Schema } = require('mongoose');

const orderSchema = new Schema({

products: {
    type: [ Schema.Types.ObjectId ],
    ref: 'Product'
  },
}, { timestamps: true });

module.exports = model('Order', orderSchema);
