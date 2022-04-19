import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './services/user.service';
import { AuthMiddleware } from '../auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ], 'main'),
  ],
  providers: [UserService],
  controllers: [],
  exports: [
    UserService
  ],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('users');
  }
}
