import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import { validateOrReject, IsDefined, IsNumber } from 'class-validator'
import { Product } from './Product'
import { Stock } from './Stock'

@Entity()
export class ProductQuantity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Product, product => product.productQuantities, { onDelete: 'CASCADE', cascade: true })
    @IsDefined()
    product: Product

    @ManyToOne(type => Stock, stock => stock.productQuantities, { onDelete: 'CASCADE', cascade: true })
    @IsDefined()
    stock: Stock

    @Column('double')
    @IsDefined()
    @IsNumber()
    value: number;

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
