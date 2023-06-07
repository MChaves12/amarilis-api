const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: 'Category'
  }
}, { timestamps: true });

module.exports = model('User', userSchema);
