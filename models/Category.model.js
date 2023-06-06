const { model, Schema } = require('mongoose');

const categorySchema = new Schema({

products: {
    type: [ Schema.Types.ObjectId ],
    ref: 'Product'
  },
}, { timestamps: true });

module.exports = model('Category', categorySchema);
