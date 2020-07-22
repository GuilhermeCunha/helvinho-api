import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { validateOrReject, IsDefined, IsString } from 'class-validator'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      unique: true,
      length: 100
    })
    @IsDefined()
    @IsString()
    email: string;

    @Column('text')
    @IsDefined()
    @IsString()
    username: string;

    @Column('text')
    @IsDefined()
    @IsString()
    password: string;

    @Column('text')
    @IsDefined()
    @IsString()
    role: string;

    // HOOKS
    // HOOKS
    // @BeforeInsert()
    // @BeforeUpdate()
    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
