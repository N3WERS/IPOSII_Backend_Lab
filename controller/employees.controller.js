const db = require('../db')

class EmployeesController {
    async createEmployees(req, res, next) {
        try {
            const {name, salary} = req.body
            if (!name || !salary) {
                throw new Error("Неверные данные")
            }
            await db.query(`INSERT INTO employees (name, salary) VALUES ($1, $2)`, [name, salary])
            res.json('Сотрудник добавлен')
        } catch (e) {
            next(e)
        }
    }

    async getEmployees(res, next) {
        try {
            const employees = await db.query(`SELECT * FROM employees`)
            res.json(employees)
        } catch (e) {
            next(e)
        }
    }

    async deleteEmployees(req, res, next) {
        try {
            const {employees_id} = req.query
            await db.query(`DELETE from employees where employees_id=($1)`, [employees_id])
            res.json('Сотрудник удален')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new EmployeesController()