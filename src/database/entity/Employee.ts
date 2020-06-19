import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { validateOrReject, IsDefined, IsString, IsOptional } from 'class-validator'

@Entity()
export class Employee extends BaseEntity {
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
    category: string;

    @Column('text')
    @IsDefined()
    @IsString()
    cellphone: string;

    @Column('text')
    @IsOptional()
    @IsString()
    secondCellphone: string;

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
