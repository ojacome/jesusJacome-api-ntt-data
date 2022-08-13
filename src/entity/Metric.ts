import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Metric{
    
    @PrimaryGeneratedColumn()
    id_repository: Number


    @Column()
    coverage: Number


    @Column()
    bugs: Number


    @Column()
    vulnerabilities: Number


    @Column()
    hotspot: Number


    @Column()
    code_smells: Number
}