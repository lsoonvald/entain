import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mockOffices } from 'office/helpers/office';
import { OfficeEntity } from 'office/office.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class OfficeService implements OnModuleInit {

    constructor(
        @InjectRepository(OfficeEntity, 'main')
        private readonly officeEntityRepository: Repository<OfficeEntity>
    ) {}

    onModuleInit() {
        if (process.env.MODE === 'DEV') this.createDefaultTestOffices();
    }

    async createDefaultTestOffices(): Promise<void> {
        const response = await this.officeEntityRepository.find();
        if (response.length < 3) {
            this.officeEntityRepository.save(mockOffices);
        }
    }

    getOffices(): Promise<OfficeEntity[]> {
        return this.officeEntityRepository.find();
    }
}
