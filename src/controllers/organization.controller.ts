import { AppDataSource } from "../dataSource"
import { Organization } from "../entity/Organization"
import { Request, Response } from 'express'

export let createOrganization = async (req: Request, res: Response) => {

    const newOrganization = await AppDataSource.getRepository(Organization).create(req.body)
    const result = await AppDataSource.getRepository(Organization).save(newOrganization)

    return res.status(201).json({
        message: "successfully created organization",
        result
    })
}

export let getOrganization = async (req: Request, res: Response) => {

    const organizations = await AppDataSource.getRepository(Organization).find()

    return res.status(200).json({
        organizations
    })
}

export let updateOrganization = async (req: Request, res: Response) => {

    let id: number = Number(req.params.id)
    const organizationDB = await AppDataSource.getRepository(Organization).findOne({
        where: {
            id_organization: id
        }
    })

    if (!organizationDB) {
        return res.status(404).json({ message: "organization not found" })
    }

    AppDataSource.getRepository(Organization).merge(organizationDB, req.body)
    const results = await AppDataSource.getRepository(Organization).save(organizationDB)

    return res.status(200).json({
        message: "updated organization",
        results
    })
}