import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RenewTokenDto } from './dto/renew-token.dto';
import { ReturnTokenDto } from './dto/return-token.dto';
import { AuthService } from './services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    @ApiResponse({ status: 200, type: ReturnTokenDto })
    async login(@Body() data: LoginDto): Promise<ReturnTokenDto> {
        return await this.authService.login(data);
    }

    @Post('/renew')
    @ApiResponse({ status: 200, type: ReturnTokenDto })
    async renewToken(@Body() data: RenewTokenDto): Promise<ReturnTokenDto> {
        return await this.authService.renewToken(data);
    }
}
