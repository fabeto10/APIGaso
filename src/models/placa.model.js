const { Schema, model } = require('mongoose')


const Placa = model('Placa', {
  placa1: {
    type: Number,
    required: true,
  },
  placa2: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  }
})

module.exports = Placa
