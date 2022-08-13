// import 'reflect-metada'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/user.routes'
import { AppDataSource } from './dataSource'
import { Organization } from './entity/Organization'
import { Repository, StateRepository, StatusRepository } from './entity/Repository'
import { Metric } from './entity/Metric'
import { Tribe } from './entity/Tribe'

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
    .then(async () => {
        let metric = new Metric
        metric.bugs = 8
        metric.code_smells = 3
        metric.coverage = 80
        metric.hotspot = 2
        metric.vulnerabilities = 7
        await AppDataSource.manager.save(metric)

        let repo = new Repository
        repo.name = "backend"
        repo.state = StateRepository.ENABLE
        repo.status = StatusRepository.ACTIVE
        repo.metric = metric
        await AppDataSource.manager.save(repo)

        let tribe = new Tribe
        tribe.name = "adq :')"
        tribe.status = 1
        tribe.repositories = [repo]
        await AppDataSource.manager.save(tribe)

        let organization = new Organization
        organization.name = "ntt data"
        organization.status = 1
        organization.tribes = [tribe]
        await AppDataSource.manager.save(organization)

        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })