import { Test, TestingModule } from '@nestjs/testing';
import { BlocksService } from './blocks.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BlocksService', () => {
  let service: BlocksService;

  const prismaMock = {
    block: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlocksService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<BlocksService>(BlocksService);
  });

  it('create calls prisma.block.create', async () => {
    const dto = { title: 'b1' };
    const result = { id: 1, title: 'b1' };
    (prismaMock.block.create as jest.Mock).mockResolvedValue(result);

    const res = await service.create(dto as any);

    expect(prismaMock.block.create).toHaveBeenCalledWith({ data: dto });
    expect(res).toEqual(result);
  });

  it('findAll calls prisma.block.findMany', async () => {
    const list = [{ id: 1 }];
    (prismaMock.block.findMany as jest.Mock).mockResolvedValue(list);

    const res = await service.findAll();

    expect(prismaMock.block.findMany).toHaveBeenCalledWith();
    expect(res).toEqual(list);
  });

  it('findOne calls prisma.block.findUnique', async () => {
    const item = { id: 2 };
    (prismaMock.block.findUnique as jest.Mock).mockResolvedValue(item);

    const res = await service.findOne(2);

    expect(prismaMock.block.findUnique).toHaveBeenCalledWith({
      where: { id: 2 },
    });
    expect(res).toEqual(item);
  });

  it('update calls prisma.block.update', async () => {
    const updated = { id: 1, title: 'x' };
    (prismaMock.block.update as jest.Mock).mockResolvedValue(updated);

    const res = await service.update(1, { title: 'x' } as any);

    expect(prismaMock.block.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: 'x' },
    });
    expect(res).toEqual(updated);
  });

  it('remove calls prisma.block.delete', async () => {
    const deleted = { id: 3 };
    (prismaMock.block.delete as jest.Mock).mockResolvedValue(deleted);

    const res = await service.remove(3);

    expect(prismaMock.block.delete).toHaveBeenCalledWith({ where: { id: 3 } });
    expect(res).toEqual(deleted);
  });
});
