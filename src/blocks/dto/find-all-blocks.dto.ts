import { IsEnum } from 'class-validator';

export enum OrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class FindAllBlocksDto {
  @IsEnum(OrderEnum)
  priority?: OrderEnum;
}
