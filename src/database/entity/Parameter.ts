import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import { validateOrReject, IsOptional, IsString } from 'class-validator'
import { Pool } from './Pool'

@Entity()
export class Parameter extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      type: 'nvarchar',
      default: 'NAO MEDIDO'
    })
    @IsString()
    @IsOptional()
    chlorine: string;

    @Column({
      type: 'nvarchar',
      default: 'NAO MEDIDO'
    })
    @IsString()
    @IsOptional()
    ph: string;

    @Column({
      type: 'nvarchar',
      default: 'NAO MEDIDO'
    })
    @IsString()
    @IsOptional()
    alkalinity: string;

    @Column({
      type: 'nvarchar',
      default: 'NAO MEDIDO'
    })
    @IsString()
    @IsOptional()
    cyanuric: string;

    @ManyToOne(type => Pool, pool => pool.parameters, { onDelete: 'CASCADE', cascade: true })
    pool: Pool;

    @Column({
      type: 'datetime'
    })
    // @IsDatestring()
    date: Date;

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
