import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Unique } from 'typeorm'
import { validateOrReject, IsDefined, IsString } from 'class-validator'
import { ProductQuantity } from './ProductQuantity'

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      unique: true,
      length: 100
    })
    @IsDefined()
    @IsString()
    name: string;

    @Column('text')
    @IsDefined()
    @IsString()
    unit: string;

    @OneToMany(type => ProductQuantity, productQuantity => productQuantity.product)
    productQuantities: ProductQuantity[]

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
