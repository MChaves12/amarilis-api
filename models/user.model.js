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
  passwordHash: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = model('User', userSchema);