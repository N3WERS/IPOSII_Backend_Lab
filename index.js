const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config()
const errorMiddleware = require('./middleware/error-middleware')
const userRouter = require('./routes/user.routes')
const animalRouter = require('./routes/animal.routes')
const employeesRouter = require('./routes/employees.routes')
const enclosuresRouter = require('./routes/enclosures.routes')
const authMiddleware = require('./middleware/auth-middleware')


const PORT = process.env.PORT;
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', userRouter)
app.use('/api', animalRouter)
app.use('/api', authMiddleware, employeesRouter)
app.use('/api', authMiddleware, enclosuresRouter)
app.use(errorMiddleware)
app.listen(PORT, () => console.log(PORT))