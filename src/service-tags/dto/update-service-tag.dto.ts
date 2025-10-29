import { PartialType } from '@nestjs/swagger';
import { CreateServiceTagDto } from './create-service-tag.dto';

export class UpdateServiceTagDto extends PartialType(CreateServiceTagDto) {}
