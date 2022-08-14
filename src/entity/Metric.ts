import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Metric{
    
    @PrimaryGeneratedColumn()
    id_repository: number


    @Column()
    coverage: number


    @Column()
    bugs: number


    @Column()
    vulnerabilities: number


    @Column()
    hotspot: number


    @Column()
    code_smells: number
}