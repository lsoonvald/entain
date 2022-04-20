import { OfficeEntity } from 'office/office.entity';
import { MetaData } from 'shared/entitites/meta-data';
import { TagEntity } from 'tag/tag.entity';
import { Entity, Column, JoinColumn, ManyToMany, JoinTable, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('user')
export class UserEntity extends MetaData {
    @Column({ name: 'id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id?: number;

    @Column({ name: 'email', type: 'text', unique: true })
    email?: string;

    @Column({ name: 'psw', type: 'text', nullable: true })
    psw?: string;

    @Column({ name: 'first_name', type: 'text', nullable: true })
    firstName?: string;

    @Column({ name: 'last_name', type: 'text', nullable: true })
    lastName?: string;

    @ManyToOne(() => OfficeEntity, {
        eager: true,
        cascade: true,
    })
    @JoinColumn()
    public office?: OfficeEntity;

    @Column({ name: 'birth_date', type: 'date', nullable: true })
    birthDate?: Date | null;

    @Column({ name: 'mobile', nullable: true })
    mobile?: string;

    @Column({ name: 'admin', type: 'boolean', default: false })
    admin?: boolean;

    @ManyToMany(() => TagEntity, {
        eager: true,
        cascade: true,
    })
    @JoinTable()
    public tags?: TagEntity[];

    constructor(input: UserEntity) {
        super();
        Object.assign(this, input);
    }
}
