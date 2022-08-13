import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { Tribe } from './Tribe'

@Entity()
export class Organization{
    
    @PrimaryGeneratedColumn()
    id_organization: Number

    @Column({ length: 50 })
    name: string

    @Column()
    status: Number

    @OneToMany(() => Tribe, (tribe) => tribe.organization)
    tribes: Tribe[]
}