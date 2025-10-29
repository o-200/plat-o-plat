import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
  @ApiProperty({
    description:
      'Название услуги. Пример - Пополнение баланса, показания счётчиков...',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description:'Идентификатор тега сервиса',
  })
  @IsNumber()
  @IsNotEmpty()
  serviceTagId: number
}
