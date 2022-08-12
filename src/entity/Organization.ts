import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Organization{
    
    @PrimaryGeneratedColumn()
    id_organization: Number

    @Column({ length: 50 })
    name: string

    @Column()
    status: Number
}