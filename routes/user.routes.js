const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/admin', userController.createAdmin)
router.get('/admin', userController.adminLogin)
router.get('/refresh', userController.refresh)
router.put('/logout', userController.logout)

module.exports = router