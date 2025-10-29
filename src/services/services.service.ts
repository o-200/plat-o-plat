import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '../prisma/prisma.service'; // relative to avoid alias issues
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.service.findMany();
  }

  findByServiceTag(serviceTagId: number) {
    return this.prisma.service.findMany({
      where: { serviceTagId: serviceTagId },
      orderBy: { id: 'desc' },
    });
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
