import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindServiceTagsDto {
  @ApiPropertyOptional({ type: Number, description: 'Идентификатор блока' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  blockId?: number;
}
