const db = require('../db')
const ApiError = require('../exciptions/api-error')

class AnimalController {
    async createAnimal(req, res, next) {
        try {
            const {species, name, color, age, habitat, notes, diet_id, enclosute_id} = req.body
            if (!species || !name || !color || !age || !habitat || !notes || !diet_id || !enclosute_id) {
                throw new ApiError.BadRequest("Данные введены неверно")
            }
            await db.query(`INSERT INTO posts (species, name, color, age, habitat, notes, diet_id, enclosute_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [species, name, color, age, habitat, notes, diet_id, enclosute_id])
            res.json("Новое животное добавлено")
        } catch (e) {
            next(e)
        }
    }

    async getAnimals(req, res, next) {
        try {
            const animals = await db.query(`SELECT * from animals`)
            console.log(animals.rows[0])
            res.json(animals.rows[0])
        } catch (e) {
            next(e)
        }
    }

    async deleteAnimal(req, res, next) {
        try {
            const {animal_id} = req.body
            await db.query('DELETE from animals where animal_id=($1)', [animal_id])
            res.json('Животное удалено')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AnimalController()