// import 'reflect-metada'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/user.routes'
import { AppDataSource } from './dataSource'

let app = express()

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//routes
app.use(userRoutes)

app.listen(3000)
console.log('server on port ', 3000)

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })