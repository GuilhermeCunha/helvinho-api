import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm'
import { validateOrReject, IsDefined, IsString, IsDate } from 'class-validator'

@Entity()
export class ResetPassword extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    @IsDefined()
    @IsString()
    user_id: string;

    @Column('text')
    @IsDefined()
    @IsString()
    token: string;

    @Column('datetime')
    @IsDefined()
    @IsDate()
    expiresAt: Date;

    async validate (): Promise<void> {
      console.log('Validando...')
      await validateOrReject(this)
    }
}
