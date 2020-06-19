import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm'
import { validateOrReject, IsDefined, IsString } from 'class-validator'
import { Parameter } from './Parameter'
import { Client } from './Client'

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

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
