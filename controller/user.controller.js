const db =  require('../db.js')
const bcryptjs = require('bcryptjs')
const tokenService = require('../services/token-service.js')
const ApiError = require('../exciptions/api-error.js')
const UserService = require('../services/user-service.js')
const jwt = require('jsonwebtoken')

class UserController {
    async createAdmin(req, res, next) {
        try {
            const {email, password} = req.body
            if (!email || !password) {
                throw ApiError.BadRequest("Введены неверные данные")
            }
            const currentUser = await db.query(`SELECT * from users where email=($1)`, [email])
            if (currentUser.rows[0]) {
                throw ApiError.BadRequest("Пользователь уже существует!")
            }
            const passwordHash = await UserService.createHashPassword(password)
            const user = await UserService.createNewUser('Admin', email, passwordHash, true)
            res.json('Админ создан')
        } catch (e) {
            next(e)
        }
    }

    async adminLogin(req, res, next) {
        try {
            const {email, password} = req.query
            if (!email || !password) {
                throw ApiError.BadRequest("Не введены данные")
            }
            const user = await db.query(`SELECT id, name, password from users where email=($1)`, [email])
            if (!user.rows[0].password) {
                throw ApiError.BadRequest("Такого пользователя не существует")
            }
            const truePassword = await bcryptjs.compare(password, user.rows[0].password)
            if (!truePassword) { 
                throw ApiError.UnauthorizedError()
            }
            const tokens = await UserService.genTokens(user.rows[0].id, email, true)
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json({user: {id: user.rows[0].id, name: user.rows[0].name, email, adminRole: true}, accessToken: tokens.accessToken})
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) { 
        try {
            const {refreshToken} = req.cookies
            if (!refreshToken) {
                throw ApiError.UnauthorizedError()
            }
            const validateToken = tokenService.verifyRefreshToken(refreshToken)
            const refreshTokenFromDB = await db.query(`SELECT token FROM tokens WHERE user_id=($1)`, [validateToken.id])
            if (!validateToken || !refreshTokenFromDB) {
                throw ApiError.UnauthorizedError()
            }
            const currentUser = await db.query(`SELECT id, email, name, picture, password FROM users WHERE id=($1)`, [validateToken.id])
            const userInfo = {id: currentUser.rows[0].id, email: currentUser.rows[0].email, adminRole: !!currentUser.rows[0].password, name: currentUser.rows[0].name, picture: currentUser.rows[0].picture}
            const accessToken = await jwt.sign(userInfo, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
            res.json({accessToken, user: userInfo})
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) { 
        try {
            const {refreshToken} = req.cookies
            await db.query(`DELETE from tokens WHERE token=($1)`, [refreshToken])
            res.clearCookie('refreshToken')
            res.status(200).json('Успешный выход')
        } catch (e) { 
            next(e)
        }
    }
}

module.exports = new UserController()