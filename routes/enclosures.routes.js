const Router = require('express')
const router = new Router()
const EnclosuresController = require('../controller/enclosures.controller')

router.post('/enclosures/create', EnclosuresController.createEnclosures)
router.delete('enclosures/delete', EnclosuresController.deleteEnclosures)
router.get('enclosures', EnclosuresController.getEnclosures)

module.exports = router