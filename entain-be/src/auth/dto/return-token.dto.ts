import { ApiProperty } from '@nestjs/swagger';

export class ReturnTokenDto {
	@ApiProperty()
	accessToken!: string;

	@ApiProperty()
	refreshToken!: string;
}
