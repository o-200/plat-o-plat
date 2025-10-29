import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ServicesService', () => {
  let service: ServicesService;

  const prismaMock = {
    service: {
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
        ServicesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get(ServicesService);
  });

  it('findAll -> prisma.service.findMany', async () => {
    const rows = [{ id: 1 }, { id: 2 }];
    (prismaMock.service.findMany as jest.Mock).mockResolvedValue(rows);

    const res = await service.findAll();

    expect(prismaMock.service.findMany).toHaveBeenCalledWith();
    expect(res).toEqual(rows);
  });

  it('findOne -> prisma.service.findUnique', async () => {
    const row = { id: 5 };
    (prismaMock.service.findUnique as jest.Mock).mockResolvedValue(row);

    const res = await service.findOne(5);

    expect(prismaMock.service.findUnique).toHaveBeenCalledWith({ where: { id: 5 } });
    expect(res).toEqual(row);
  });

  it('update -> prisma.service.update', async () => {
    const updated = { id: 3, title: 'u' };
    (prismaMock.service.update as jest.Mock).mockResolvedValue(updated);

    const res = await service.update(3, { title: 'u' } as any);

    expect(prismaMock.service.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: { title: 'u' },
    });
    expect(res).toEqual(updated);
  });

  it('remove -> prisma.service.delete', async () => {
    const deleted = { id: 4 };
    (prismaMock.service.delete as jest.Mock).mockResolvedValue(deleted);

    const res = await service.remove(4);

    expect(prismaMock.service.delete).toHaveBeenCalledWith({ where: { id: 4 } });
    expect(res).toEqual(deleted);
  });
});
