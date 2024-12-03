const Router = require('express')
const router = new Router()
const DietsController = require('../controller/diets.controller')

router.get('diets/get', DietsController.getDiets)
router.post('diets/create', DietsController.createDiets)
router.delete('/diets/delete', DietsController.deleteDiets)

module.exports = router