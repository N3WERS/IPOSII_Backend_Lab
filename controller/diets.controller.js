const db = require('../db')
const ApiError = require('../exciptions/api-error')

class DietsController {
    async getDiets(req, res, next) {
        try {
            const diets = await db.query(`SELECT * FROM diets`)
            res.json(diets)
        } catch (e) {
            next(e)
        }
    }

    async createDiets(res, next) {
        try {
            const {description} = req.body
            const animals = await db.query(`INSERT INTO diets (description) VALUES ($1)`, [description])
            res.json('Новые правила диеты созданы')
        } catch (e) {
            next(e)
        }
    }

    async deleteDiets(req, res, next) {
        try {
            const {diet_id} = req.body
            await db.query('DELETE from diets where diet_id=($1)', [diet_id])
            res.json('Правило диеты удалено')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new DietsController()