const { Router } = require('express')
const paginate = require('../services/paginate.service')
const Placa = require('../models/placa.model')
const City = require('../models/city.model')

const router = new Router()

const serializer = (placa) => {
  return placa.toObject({ versionKey: false })
}

router.get('/', async (req, res) => {
  const placas = await Placa.find();
  res.json(placas);
})
router.get('/fecha/:fecha', async (req, res) => {
  let fecha = (new Date(req.params.fecha)).toLocaleDateString();
  const placas = await Placa.find();
  let placa = placas.filter((item) => {
    console.log(item.fecha);
    return item.fecha.toLocaleDateString() == fecha; 
  })[0];
  res.json(placa);
});
router.get('/:placaId', async (req, res) => {
  let id = req.params.placaId;
  const placa = await Placa.findOne({
    _id: id
  })
  res.json(placa);
});




router.post('/', async (req, res) => {
  const placa = await new Placa({
    ...req.body,
  }).save();
  res.send(serializer(placa));
});

module.exports = router;
