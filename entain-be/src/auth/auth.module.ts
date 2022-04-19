import { Module } from '@nestjs/common';
import { UserModule } from 'user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}