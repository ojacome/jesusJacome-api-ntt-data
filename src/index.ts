// import 'reflect-metada'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { AppDataSource } from './dataSource'
import { Organization } from './entity/Organization'
import { Repository, StateRepository, StatusRepository } from './entity/Repository'
import { Metric } from './entity/Metric'
import { Tribe } from './entity/Tribe'
import router from './routes/router'

let app = express()

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

app.listen(3000, () => console.log('server on port ', 3000))


AppDataSource.initialize()
    .then(async () => {
        // let metric = new Metric
        // metric.bugs = 8
        // metric.code_smells = 3
        // metric.coverage = 80
        // metric.hotspot = 2
        // metric.vulnerabilities = 7
        // await AppDataSource.manager.save(metric)

        // let repo = new Repository
        // repo.name = "backend"
        // repo.state = StateRepository.ENABLE
        // repo.status = StatusRepository.ACTIVE
        // repo.metric = metric
        // await AppDataSource.manager.save(repo)

        // let tribe = new Tribe
        // tribe.name = "adq :')"
        // tribe.status = 1
        // tribe.repositories = [repo]
        // await AppDataSource.manager.save(tribe)

        // let organization = new Organization
        // organization.name = "ntt data"
        // organization.status = 1
        // organization.tribes = [tribe]
        // await AppDataSource.manager.save(organization)

        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })