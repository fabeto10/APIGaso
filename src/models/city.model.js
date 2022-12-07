const { model } = require('mongoose')

const City = model('City', {
  Lugar: {
    type: String,
    required: true,
  }
})

module.exports = City
