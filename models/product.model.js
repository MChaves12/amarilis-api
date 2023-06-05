const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name:{
    type: String,
    required: [true, 'You must provide a name for your product'],
    lowercase: true
  },
  price:{
    type: Number,
    required: [true, 'You must provide a price for your product'],
  },
  description: String,
  size: String,
  image: String,
  
  
}, { timestamps: true })

module.exports = model('Product', productSchema);
