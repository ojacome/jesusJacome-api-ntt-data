import { Request, Response } from 'express'
import { Between, MoreThan } from 'typeorm'
import { AppDataSource } from '../dataSource'
import { Metric } from '../entity/Metric'
import { Repository, StateRepository, StatusRepository } from '../entity/Repository'
import { Tribe } from '../entity/Tribe'
import * as excel from 'exceljs';

export let detailsTribe = async (req: Request, res: Response) => {

    let idTribe: number = Number(req.params.id)
    const tribeDB = await AppDataSource.getRepository(Tribe).findOne({
        where: {
            id_tribe: idTribe
        },
        relations: {
            repositories: true,
            organization: true,
        }
    })

    if (!tribeDB) {
        return res.status(404).json({ message: "La Tribu no se encuentra registrada" })
    }

    const repositories = await getRepositories(idTribe)


    return res.status(200).json({ repositories })
}

let getRepositories = (idTribe: number) => {
    return AppDataSource.getRepository(Repository).find({
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
            metric: true,
            tribe: {
                organization: true
            },
        }
    })
} 

export let getReportTribe = async (req: Request, res: Response) => {

    let idTribe: number = Number(req.params.id)
    let repositories: Repository[] = await getRepositories(idTribe)
    let fullRepositories: any[] = []
    repositories.forEach( repo => {
        let object : any
        object = repo
        object["tribe_name"] = repo.tribe.name
        object["organization_name"] = repo.tribe.organization.name
        object["coverage"] = repo.metric.coverage
        object["bugs"] = repo.metric.bugs
        object["code_smells"] = repo.metric.code_smells
        object["vulnerabilities"] = repo.metric.vulnerabilities
        object["hotspot"] = repo.metric.hotspot
        fullRepositories.push(object)
    })

    let stream: Buffer = await createExcel([
        { header: 'Name', key: 'name' },
        { header: 'State', key: 'state' },
        { header: 'Status', key: 'status' },
        { header: 'Tribe', key: 'tribe_name' },
        { header: 'Organization', key: 'organization_name' },
        { header: 'Coverage', key: 'coverage'}, 
        { header: 'CodeSmells', key: 'code_smells' },
        { header: 'Bugs', key: 'bugs'},
        { header: 'Vulnerabilities', key: 'vulnerabilities' },
        { header: 'Hotspots', key: 'hotspot' },
    ], fullRepositories, "Reporte de Repositorios");

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=Reporte${Date.now().toString()}.xlsx`);
    res.setHeader('Content-Length', stream.length);
    res.send(stream);
}

let createExcel = (headers: Partial<excel.Column>[], rows: any[], sheetName: string): Promise<Buffer> => {

    const workbook: excel.stream.xlsx.WorkbookWriter = new excel.stream.xlsx.WorkbookWriter({}); //crear el libro
    const sheet: excel.Worksheet = workbook.addWorksheet(sheetName); //crear hoja de trabajo y nombrarla
    sheet.columns = headers; // establecer las propiedades de las columnas 

    for (let i = 0; i < rows.length; i++) { //agregar filas a la hoja de trabajo.
        sheet.addRow(rows[i]);
    }
    sheet.commit(); //enviar los datos a la hoja.
    return new Promise((resolve, reject): void => {
        workbook.commit().then(() => { //obtener el flujo del libro de trabajo y leerlo en un bufer.
            const stream: any = (workbook as any).stream;
            const result: Buffer = stream.read();
            resolve(result);
        }).catch((e) => {
            reject(e);
        });
    });
}