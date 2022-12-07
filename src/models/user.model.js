const { Schema, model } = require('mongoose')
const UserSchema = new Schema({
  name: String,
  email: String,
  placa: {
    type: Number,
    default: 0
  }
})


const User = model('User', UserSchema);

module.exports = User
