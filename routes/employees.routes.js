const Router = require('express')
const router = new Router()
const EmployeesController = require('../controller/employees.controller')

router.post('/employees/create', EmployeesController.createEmployees)
router.delete('employees/delete', EmployeesController.deleteEmployees)
router.get('employees', EmployeesController.getEmployees)

module.exports = router