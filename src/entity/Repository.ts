import { IsEnum } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { Metric } from './Metric';
import { Tribe } from './Tribe';


export enum StatusRepository {
    ACTIVE = "A",
    INACTIVE = "I"
}

export enum StateRepository {
    ENABLE = "E",
    DISABLE = "D",
    ARCHIVED = "A"
}


@Entity()
export class Repository {

    @PrimaryGeneratedColumn()
    id_repository: Number


    @Column({ length: 50 })
    name: string


    @Column({ length: 1})
    @IsEnum(StatusRepository, {
        message: 'illegal value'
    })
    status: string;


    @Column({ length: 1})
    @IsEnum(StateRepository, {
        message: 'illegal value'
    })
    state: string;


    @CreateDateColumn({ type: "timestamp" })
    create_time: Date;

    
    @ManyToOne(() => Tribe, (tribe) => tribe.repositories)
    tribe: Tribe


    @OneToOne(() => Metric)
    @JoinColumn()
    metric: Metric
}