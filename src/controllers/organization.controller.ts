import { AppDataSource } from "../dataSource"
import { Organization } from "../entity/Organization"
import { Request, Response } from 'express'

export let createOrganization = async (req: Request, res: Response) => {

    const newOrganization = await AppDataSource.getRepository(Organization).create(req.body)
    const result = await AppDataSource.getRepository(Organization).save(newOrganization)
    
    return res.status(201).json({
        message : "successfully created organization",
        result
    })
}

export let getOrganization = async (req: Request, res: Response) => {

    const organizations = await AppDataSource.getRepository(Organization).find()

    return res.status(200).json({
        organizations
    })
}