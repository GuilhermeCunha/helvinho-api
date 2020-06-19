import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { validateOrReject, IsDefined, IsString, IsOptional } from 'class-validator'

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    @IsDefined()
    @IsString()
    name: string;

    @Column('text')
    @IsDefined()
    @IsString()
    unit: string;

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
