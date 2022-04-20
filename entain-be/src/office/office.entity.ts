import { ApiProperty } from '@nestjs/swagger';
import { MetaData } from 'shared/entitites/meta-data';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('office')
export class OfficeEntity extends MetaData {
    @Column({ name: 'id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @ApiProperty()
    id?: number;

    @Column({ name: 'name', type: 'text', nullable: true })
    @ApiProperty()
    name?: string;

    constructor(input: OfficeEntity) {
        super();
        Object.assign(this, input);
    }
}
