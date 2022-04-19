import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class MetaData {
  @CreateDateColumn({ name: 'created', type: 'timestamp with time zone' })
  created?: Date;

  @UpdateDateColumn({ name: 'updated', type: 'timestamp with time zone' })
  updated?: Date;
}
