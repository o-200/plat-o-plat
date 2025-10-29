import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { $Enums } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

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
}
