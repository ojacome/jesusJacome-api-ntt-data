import { Request, Response } from 'express'


export let getStateRepositories = async (req: Request, res: Response) => {

    let repositories = [
        {
            id: 1,
            state: 604
        },
        {
            id: 2,
            state: 605
        },
        {
            id: 3,
            state: 606
        }
    ]

    return res.status(200).json(
        { repositories }
    )
}