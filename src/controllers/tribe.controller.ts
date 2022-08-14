import { Request, Response } from 'express'
import { Between, MoreThan } from 'typeorm'
import { AppDataSource } from '../dataSource'
import { Metric } from '../entity/Metric'
import { Repository, StateRepository } from '../entity/Repository'
import { Tribe } from '../entity/Tribe'

export let detailsTribe = async (req: Request, res: Response) => {

    let idTribe: number = Number(req.params.id)
    const tribeDB = await AppDataSource.getRepository(Tribe).findOne({
        where: {
            id_tribe: idTribe
        },
        relations: {
            repositories: true
        }
    })

    if (!tribeDB) {
        return res.status(404).json({ message: "La Tribu no se encuentra registrada" })
    }

    const repositories = await AppDataSource.getRepository(Repository).find({
        where: {
            tribe: {
                id_tribe: idTribe
            },
            state: StateRepository.ENABLE,
            create_time: Between(
                new Date(2022, 1, 1),
                new Date(2022, 12, 31)
            ),
            metric: {
                coverage: MoreThan(75)
            }
        },
        relations: {
            metric: true
        }
    })


    return res.status(200).json({ repositories })
}