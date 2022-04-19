import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from 'tag/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {

    constructor(
        @InjectRepository(TagEntity, 'main')
        private readonly tagRepository: Repository<TagEntity>
    ) {}

    getTags(): Promise<TagEntity[]> {
        return this.tagRepository.find();
    }
}
