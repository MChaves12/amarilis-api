const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
name: {
  type: String,
  lowercase: true,
  require: [true, 'You must provide a name for your category']
},
products: {
    type: [ Schema.Types.ObjectId ],
    ref: 'Product'
  },
}, { timestamps: true });

module.exports = model('Category', categorySchema);
