const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  size: String,
  image: String,
  
}, { timestamps: true })

module.exports = model('Product', productSchema);