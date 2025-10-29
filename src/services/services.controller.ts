import { Controller, Get, Body, Patch, Param, Delete, Post, Query, ParseIntPipe } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('services')
@ApiTags('Services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({
    summary: 'Список услуг',
  })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get()
  @ApiOperation({
    summary: 'Поиск услуг по тегу',
  })
  @ApiResponse({
    type: CreateServiceDto,
    isArray: true,
  })
  findByServiceTag(
    @Query('blockId', ParseIntPipe) serviceTagId: number
  ) {
    return this.servicesService.findByServiceTag(serviceTagId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Поиск услуги по идентификатору',
  })
  @ApiResponse({
    type: CreateServiceDto,
  })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Post()
  @ApiOperation({
    summary: 'Создание услуги',
    description: 'Тип услуги. Пополнение баланса, показания счётчиков..'
  })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({
    type: CreateServiceDto,
  })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(
      createServiceDto,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление услуги',
  })
  @ApiBody({ type: UpdateServiceDto })
  @ApiResponse({
    type: UpdateServiceDto,
  })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление услуги',
  })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
