import { ApiProperty } from '@nestjs/swagger';
import { MetaData } from 'shared/entitites/meta-data';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class TagEntity extends MetaData {
    @Column({ name: 'id' })
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @ApiProperty()
    id!: number;

    @Column({ name: 'text', type: 'text', nullable: true })
    @ApiProperty()
    text!: string;

    constructor(input: TagEntity) {
        super();
        Object.assign(this, input);
    }
}
