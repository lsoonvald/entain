import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TagService } from './services/tag.service';
import { TagEntity } from './tag.entity';

@Controller('tag')
export class TagController {

    constructor(private tagService: TagService) {}

    @Get()
    @ApiResponse({ status: 200, type: TagEntity, isArray: true })
    getOffices(): Promise<TagEntity[]> {
        return this.tagService.getTags();
    }
}
