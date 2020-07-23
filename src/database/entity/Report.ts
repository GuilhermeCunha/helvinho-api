import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm'
import { validateOrReject, IsDefined, IsString, IsOptional } from 'class-validator'
import { Pool } from './Pool'
import { Client } from './Client'

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
      type: 'text'
    })
    @IsString()
    status: 'active' | 'done' | 'seen'

    // @ManyToOne(type => Pool, pool => pool.reports, { onDelete: 'CASCADE', cascade: true })
    // @IsDefined()
    // pool: Pool;
    @OneToOne(type => Client)
    @JoinColumn()
    client: Client;

    @ManyToMany(type => Pool, pool => pool.reports)
    @JoinTable()
    pools?: Pool[];

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
