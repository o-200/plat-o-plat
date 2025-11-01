import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export enum OrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class FindAllByServiceTagDto {
  @ApiProperty({
    description: 'Идентификатор тега сервиса',
  })
  @IsNumber()
  @IsNotEmpty()
  serviceTagId: number

  @ApiPropertyOptional({ type: Number, description: 'Поиск по приоритету' })
  @IsOptional()
  @IsEnum(OrderEnum)
  priority?: OrderEnum;
}
