import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServiceTagServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(serviceTagId: number, dto: CreateServiceDto) {
    const st = await this.prisma.serviceTag.findUnique({
      where: { id: serviceTagId },
      select: { id: true },
    });
    if (!st) throw new NotFoundException('Service Tag not found');

    return this.prisma.service.create({
      data: { ...dto, serviceTagId },
    });
  }

  findAll(serviceTagId: number) {
    return this.prisma.service.findMany({
      where: { serviceTagId },
      orderBy: { id: 'desc' },
    });
  }
}
