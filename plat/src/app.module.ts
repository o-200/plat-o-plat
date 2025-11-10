import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlocksModule } from './blocks/blocks.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceTagsModule } from './service-tags/service-tags.module';
import { ServicesModule } from './services/services.module';
import { AppLoggerMiddleware } from './common/middlewares/app-logger-middleware';

@Module({
  imports: [PrismaModule, BlocksModule, ServiceTagsModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [PrismaModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
