import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import { validateOrReject, IsOptional, IsNumber, IsDateString, IsString } from 'class-validator'
import { Pool } from './Pool'

@Entity()
export class Parameter extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 'NAO MEDIDO' })
    @IsString()
    @IsOptional()
    chlorine: String;

    @Column({ default: 'NAO MEDIDO' })
    @IsString()
    @IsOptional()
    ph: String;

    @Column({ default: 'NAO MEDIDO' })
    @IsString()
    @IsOptional()
    alkalinity: String;

    @Column({ default: 'NAO MEDIDO' })
    @IsString()
    @IsOptional()
    cyanuric: String;

    @ManyToOne(type => Pool, pool => pool.parameters, { onDelete: 'CASCADE', cascade: true })
    pool: Pool;

    @Column({
      type: 'datetime'
    })
    // @IsDateString()
    date: Date;

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
