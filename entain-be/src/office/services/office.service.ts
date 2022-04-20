import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mockOffices } from 'office/helpers/office';
import { OfficeEntity } from 'office/office.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OfficeService implements OnModuleInit {

    constructor(
        @InjectRepository(OfficeEntity, 'main')
        private readonly officeEntityRepository: Repository<OfficeEntity>
    ) {}

    onModuleInit() {
        if (process.env.MODE === 'DEV') this.createDefaultTestOffices();
    }

    createDefaultTestOffices(): void {
        this.officeEntityRepository.upsert(mockOffices, ['id']);
    }

    getOffices(): Promise<OfficeEntity[]> {
        return this.officeEntityRepository.find();
    }
}
