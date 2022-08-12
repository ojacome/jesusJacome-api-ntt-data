import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User{
    
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    firstname: string

    @Column()
    lastname: string
}