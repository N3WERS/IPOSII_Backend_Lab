const db = require('../db')

class EnclosuresController {
    async createEnclosures(req, res, next) {
        try {
            const {name, animal_class, capacity, employees_id} = req.body
            if (!name || !animal_class || !capacity || !employees_id) {
                throw new Error("Неверные данные")
            }
            await db.query(`INSERT INTO enclosures (name, animal_class, capacity, employees_id) VALUES ($1, $2, $3, $4)`, [name, animal_class, capacity, employees_id])
            res.json('Вольер добавлен')
        } catch (e) {
            next(e)
        }
    }

    async getEnclosures(res, next) {
        try {
            const enclosures = await db.query(`SELECT * FROM enclosures`)
            res.json(enclosures)
        } catch (e) {
            next(e)
        }
    }

    async deleteEnclosures(req, res, next) {
        try {
            const {enclosures_id} = req.query
            await db.query(`DELETE from enclosures where enclosures_id=($1)`, [enclosures_id])
            res.json('Вольер удален')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new EnclosuresController()