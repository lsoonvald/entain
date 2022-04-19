import { ApiProperty } from '@nestjs/swagger';
import { MetaData } from 'shared/entitites/meta-data';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tag')
export class TagEntity extends MetaData {
    @Column({ name: 'id' })
    @PrimaryColumn({ type: 'bigint' })
    @ApiProperty()
    id!: number;

    @Column({ name: 'text', type: 'text' })
    @ApiProperty()
    text!: string;

    constructor(input: TagEntity) {
        super();
        Object.assign(this, input);
    }
}
