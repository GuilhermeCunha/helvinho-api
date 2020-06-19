import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import { validateOrReject, IsDefined, IsString, IsOptional, IsNumber, IsDataURI, IsDate, IsDateString } from 'class-validator'
import { Pool } from './Pool'

@Entity()
export class Parameter extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      type: 'double',
      default: 0
    })
    @IsNumber()
    @IsOptional()
    chlorine: number;

    @Column({
      type: 'double',
      default: 0
    })
    @IsNumber()
    @IsOptional()
    ph: number;

    @Column({
      type: 'double',
      default: 0
    })
    @IsNumber()
    @IsOptional()
    alkalinity: number;

    @Column({
      type: 'double',
      default: 0
    })
    @IsNumber()
    @IsOptional()
    acid: number;

    @Column({
      type: 'double',
      default: 0
    })
    @IsNumber()
    @IsOptional()
    cyanuric: number;

    @ManyToOne(type => Pool, pool => pool.parameters, { onDelete: 'CASCADE', cascade: true })
    pool: Pool;

    @Column({
      type: 'date'
    })
    @IsDateString()
    date: Date;

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
