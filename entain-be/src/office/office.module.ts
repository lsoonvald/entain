import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OfficeService } from './services/office.service';
import { OfficeController } from './office.controller';
import { AuthMiddleware } from 'auth/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeEntity } from './office.entity';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OfficeEntity
    ], 'main'),
    UserModule
  ],
  providers: [OfficeService],
  controllers: [OfficeController]
})
export class OfficeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('office');
  }
}
