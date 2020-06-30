import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm'
import { validateOrReject, IsDefined } from 'class-validator'
import { ProductQuantity } from './ProductQuantity'
import { Client } from './Client'

@Entity()
export class Stock extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(type => ProductQuantity, productQuantity => productQuantity.stock)
    productQuantities: ProductQuantity[]

    @ManyToOne(type => Client, client => client.stocks, { onDelete: 'CASCADE', cascade: true })
    @IsDefined()
    client: Client

    @Column({
      type: 'date'
    })
    // @IsDateString()
    date: Date;

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
