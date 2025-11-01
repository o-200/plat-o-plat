import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllBlocksDto } from './dto/find-all-blocks.dto';

@Injectable()
export class BlocksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBlockDto: CreateBlockDto) {
    return this.prisma.block.create({ data: createBlockDto });
  }

  findAll({ priority }: FindAllBlocksDto) {
    return this.prisma.block.findMany({
      orderBy: priority
      ? { priority: priority }
      : undefined,
    });
  }

  findOne(id: number) {
    return this.prisma.block.findUnique({ where: { id } });
  }

  update(id: number, updateBlockDto: UpdateBlockDto) {
    return this.prisma.block.update({
      where: { id },
      data: updateBlockDto,
    });
  }

  remove(id: number) {
    return this.prisma.block.delete({ where: { id } });
  }
}
