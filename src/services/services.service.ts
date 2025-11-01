import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '../prisma/prisma.service'; // relative to avoid alias issues
import { CreateServiceDto } from './dto/create-service.dto';
import { FindAllByServiceTagDto } from './dto/find-all-by-service-tag.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.service.findMany();
  }

  async findByServiceTag(query: FindAllByServiceTagDto) {
    const services = await this.prisma.service.findMany({
      where: query.serviceTagId
        ? { serviceTagId: query.serviceTagId }
        : undefined,
      orderBy: query.priority
        ? { id: query.priority }
        : undefined,
    });

    if (services.length === 0) throw new NotFoundException('No services');
    return services
  }

  findOne(id: number) {
    return this.prisma.service.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateServiceDto) {
    const st = await this.prisma.serviceTag.findUnique({
      where: { id: dto.serviceTagId },
      select: { id: true },
    });
    if (!st) throw new NotFoundException('Service Tag not found');

    return this.prisma.service.create({
      data: { ...dto },
    });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  remove(id: number) {
    return this.prisma.service.delete({ where: { id } });
  }
}
