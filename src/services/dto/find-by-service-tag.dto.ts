import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FindByServiceTagDto {
  @ApiProperty({
    description: 'Идентификатор тега сервиса',
  })
  @IsNumber()
  @IsNotEmpty()
  serviceTagId: number
}
