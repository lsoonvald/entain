import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficeEntity } from 'office/office.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OfficeService {

    constructor(
        @InjectRepository(OfficeEntity, 'main')
        private readonly officeEntityRepository: Repository<OfficeEntity>
    ) {}

    getOffices(): Promise<OfficeEntity[]> {
        return this.officeEntityRepository.find();
    }
}
