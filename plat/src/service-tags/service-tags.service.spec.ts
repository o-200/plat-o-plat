import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTagsService } from './service-tags.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ServiceTagsService', () => {
  let service: ServiceTagsService;

  const prismaMock = {
    serviceTag: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceTagsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get(ServiceTagsService);
  });

  describe('findOne', () => {
    it('calls prisma.serviceTag.findUnique', async () => {
      (prismaMock.serviceTag.findUnique as jest.Mock).mockResolvedValue({ id: 1 });

      const res = await service.findOne(1);

      expect(prismaMock.serviceTag.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(res).toEqual({ id: 1 });
    });
  });

  describe('update', () => {
    it('calls prisma.serviceTag.update', async () => {
      (prismaMock.serviceTag.update as jest.Mock).mockResolvedValue({ id: 2, title: 't' });

      const res = await service.update(2, { title: 't' } as any);

      expect(prismaMock.serviceTag.update).toHaveBeenCalledWith({
        where: { id: 2 },
        data: { title: 't' },
      });
      expect(res).toEqual({ id: 2, title: 't' });
    });
  });

  describe('remove', () => {
    it('calls prisma.serviceTag.delete', async () => {
      (prismaMock.serviceTag.delete as jest.Mock).mockResolvedValue({ id: 3 });

      const res = await service.remove(3);

      expect(prismaMock.serviceTag.delete).toHaveBeenCalledWith({
        where: { id: 3 },
      });
      expect(res).toEqual({ id: 3 });
    });
  });
});
