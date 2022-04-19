import { ApiProperty } from '@nestjs/swagger';
import { MetaData } from 'shared/entitites/meta-data';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('office')
export class OfficeEntity extends MetaData {
    @Column({ name: 'id' })
    @PrimaryColumn({ type: 'bigint' })
    @ApiProperty()
    id?: number;

    @Column({ name: 'name', type: 'text' })
    @ApiProperty()
    name?: string;

    constructor(input: OfficeEntity) {
        super();
        Object.assign(this, input);
    }
}
