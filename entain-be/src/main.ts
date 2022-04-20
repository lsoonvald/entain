import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { QueryErrorFilter } from 'shared/filters/query-error-filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('DRT Device Gate')
    .setDescription("DRT Backend Service for DRT Application")
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new QueryErrorFilter(httpAdapter));

  app.enableCors();
  await app.listen(process.env.PORT as string);
}
bootstrap();
