import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm'
import { validateOrReject, IsDefined, IsString, IsOptional } from 'class-validator'
import { Pool } from './Pool'
import { Stock } from './Stock'

@Entity()
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    @IsDefined()
    @IsString()
    name: string;

    @Column('text')
    @IsDefined()
    @IsString()
    address: string;

    @Column('text')
    @IsDefined()
    @IsString()
    cnpj: string;

    @Column('text')
    @IsDefined()
    @IsString()
    cellphone: string;

    @Column('text')
    @IsOptional()
    @IsString()
    secondCellphone: string;

    @OneToMany(type => Pool, pool => pool.client)
    pools: Pool[];

    @OneToMany(type => Stock, stock => stock.client)
    stocks: Stock[];

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
