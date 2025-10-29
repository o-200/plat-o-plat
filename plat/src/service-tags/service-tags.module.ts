import { Module } from '@nestjs/common';
import { ServiceTagsService } from './service-tags.service';
import { ServiceTagsController } from './service-tags.controller';

@Module({
  controllers: [ServiceTagsController],
  providers: [ServiceTagsService],
})
export class ServiceTagsModule {}
