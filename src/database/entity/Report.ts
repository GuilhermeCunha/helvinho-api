import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm'
import { validateOrReject, IsDefined, IsString, IsOptional } from 'class-validator'
import { Pool } from './Pool'

export enum Status {
    Active = 'active',
    Seen = 'seen',
    Done = 'done'
}

@Entity()
export class Report extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    @IsDefined()
    @IsString()
    message: string;

    @Column({
        type: 'text',
    })
    @IsString()
    status: 'active' | 'done' | 'seen'

    @ManyToOne(type => Pool, pool => pool.reports, { onDelete: 'CASCADE', cascade: true })
    @IsDefined()
    pool: Pool;

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
