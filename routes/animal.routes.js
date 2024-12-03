const Router = require('express')
const router = new Router()
const AnimalController = require('../controller/animal.controller')

router.get('/animal', AnimalController.getAnimals)
router.post('/animal/create', AnimalController.createAnimal)
router.delete('/animal/delete', AnimalController.deleteAnimal)

module.exports = router