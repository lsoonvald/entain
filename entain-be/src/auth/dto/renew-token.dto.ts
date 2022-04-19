import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class RenewTokenDto {
  @ApiProperty()
  @Allow()
  refreshToken!: string;
}
