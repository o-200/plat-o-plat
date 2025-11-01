import { Controller, Body, Patch, Param, Delete, Get, Post, ParseIntPipe, Query, ValidationPipe } from '@nestjs/common';
import { ServiceTagsService } from './service-tags.service';
import { UpdateServiceTagDto } from './dto/update-service-tag.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateServiceTagDto } from './dto/create-service-tag.dto';
import { FindAllByServiceTagDto } from 'src/services/dto/find-all-by-service-tag.dto';
import { OrderEnum } from './dto/find-all-service-tags.dto';

@Controller('service-tags')
@ApiTags('ServiceTags')
export class ServiceTagsController {
  constructor(private readonly serviceTagsService: ServiceTagsService) {}

  @Get()
  @ApiOperation({ summary: 'Список тегов' })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: OrderEnum,
    description: 'Сортировка по приоритету.'
  })
  @ApiResponse({ type: CreateServiceTagDto, isArray: true })
  @ApiNotFoundResponse({ description: 'No service tags' })
  findAll(
    @Query() query: FindAllByServiceTagDto,
  ) {
    return this.serviceTagsService.findAll(query);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Поиск тега по идентификатору',
  })
  @ApiResponse({
    type: UpdateServiceTagDto,
  })
  findOne(@Param('id') id: string) {
    return this.serviceTagsService.findOne(+id);
  }

  @Post()
  @ApiOperation({
    summary: 'Создание тега сервиса.',
    description: `Создание тега для сервиса, являясь общим названием для списка услуг. Пример - Дом и ЖКУ, Связь и телефоны;
    `,
  })
  @ApiBody({ type: CreateServiceTagDto })
  @ApiCreatedResponse({type: CreateServiceTagDto})
  create(@Body() createServiceTagDto: CreateServiceTagDto) {
    return this.serviceTagsService.create(createServiceTagDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление тега',
  })
  @ApiBody({ type: UpdateServiceTagDto })
  @ApiResponse({
    type: UpdateServiceTagDto,
    isArray: true,
  })
  update(
    @Param('id') id: string,
    @Body() updateServiceTagDto: UpdateServiceTagDto,
  ) {
    return this.serviceTagsService.update(+id, updateServiceTagDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление тега',
  })
  remove(@Param('id') id: string) {
    return this.serviceTagsService.remove(+id);
  }
}
