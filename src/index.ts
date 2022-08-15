// import 'reflect-metada'
require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { AppDataSource } from './dataSource'
import router from './routes/router'

let app = express()
let port = Number(process.env.PORT) || 3000
//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//routes
app.use('/api/v1', router);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Ruta no encontrada!"});
});

app.use((err:Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
            
    res.status(500).json({ message: 'Error en el servidor!'});
});

app.listen(port, () => console.log('server on port ', port))


AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })