import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateServiceDto {
  @ApiProperty({
    description:
      'Название услуги. Пример - Пополнение баланса, показания счётчиков...',
      minimum: 1
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: `Номер приоритета. Необходимо для показа (GET запросы) исходя из этого поля. Чем меньше значение - тем больше приоритет.
    Если не заполнено - присуждается автоматически низший приоритет.
    `,
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  priority?: number;

  @ApiProperty({
    description:'Идентификатор тега сервиса',
    minimum: 1
  })
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  serviceTagId: number
}
