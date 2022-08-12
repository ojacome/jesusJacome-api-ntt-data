import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Tribe{
    
    @PrimaryGeneratedColumn()
    id_tribe: Number

    @Column({ length: 50 })
    name: string

    @Column()
    status: Number
}