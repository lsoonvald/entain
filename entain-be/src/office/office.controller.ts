import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { OfficeEntity } from './office.entity';
import { OfficeService } from './services/office.service';

@Controller('office')
export class OfficeController {

    constructor(private officeService: OfficeService) {}

    @Get()
    @ApiResponse({ status: 200, type: OfficeEntity, isArray: true })
    getOffices(): Promise<OfficeEntity[]> {
        return this.officeService.getOffices();
    }
}
