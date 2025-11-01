import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

export enum OrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class FindAllServiceTagsDto {
  @ApiPropertyOptional({ type: Number, description: 'Идентификатор блока' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  blockId?: number;

  @ApiPropertyOptional({ type: Number, description: 'Поиск по приоритету' })
  @IsOptional()
  @IsEnum(OrderEnum)
  priority?: OrderEnum;
}
