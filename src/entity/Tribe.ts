import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import { Organization } from './Organization'
import { Repository } from './Repository'

@Entity()
export class Tribe{
    
    @PrimaryGeneratedColumn()
    id_tribe: Number

    @Column({ length: 50 })
    name: string

    @Column()
    status: Number

    @ManyToOne(() => Organization, (organization) => organization.tribes)
    organization: Organization

    @OneToMany(() => Repository, (repository) => repository.tribe)
    repositories: Repository[]
}