import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'auth/auth.middleware';
import { UserModule } from 'user/user.module';
import { TagService } from './services/tag.service';
import { TagEntity } from './tag.entity';
import { TagController } from './tag.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TagEntity
    ], 'main'),
    UserModule
  ],
  providers: [TagService],
  controllers: [TagController]
})
export class TagModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('tag');
  }
}
