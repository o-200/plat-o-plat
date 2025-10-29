import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('System')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({
    summary: 'Проверки работоспособности сервиса.',
    description: `Тестовый endpoint для проверки работы сервиса`,
  })
  @ApiResponse({
    status: 200,
    description: 'Всегда возвращает 200 ОК и тело "Hello, World!"',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
