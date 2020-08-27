import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, ManyToMany } from 'typeorm'
import { validateOrReject, IsDefined, IsString } from 'class-validator'
import { Parameter } from './Parameter'
import { Client } from './Client'
import { Report } from './Report'

@Entity()
export class Pool extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    @IsDefined()
    @IsString()
    name: string;

    @OneToMany(type => Parameter, parameter => parameter.pool)
    parameters: Parameter[]

    @ManyToOne(type => Client, client => client.pools, { onDelete: 'CASCADE', cascade: true })
    client: Client

    // @OneToMany(type => Report, report => report.pool)
    @ManyToMany(type => Report, report => report.pools)
    reports: Report[]

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
