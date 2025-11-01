import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { $Enums } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBlockDto {
  @ApiProperty({ description: 'Название блока' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: `Тип блока. "CONTENT" - блок с информацией/посты "SERVICE" - блок с услугами`,
  })
  @IsOptional()
  @IsEnum($Enums.BlockKind)
  kind?: $Enums.BlockKind;

  @ApiProperty({
    description:
    `Номер приоритета. Необходимо для показа блоков (GET запросы) исходя из этого поля. Чем меньше значение - тем больше приоритет.
    Если не заполнено - присуждается автоматически низший приоритет.
    `,
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  priority?: number;
}
