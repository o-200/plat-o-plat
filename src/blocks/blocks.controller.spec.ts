import { Test, TestingModule } from '@nestjs/testing';
import { BlocksController } from './blocks.controller';
import { BlocksService } from './blocks.service';
import { PrismaService } from '../prisma/prisma.service'; // relative to avoid alias issues
import { $Enums } from '@prisma/client';

describe('BlocksController', () => {
  let controller: BlocksController;
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
      controllers: [BlocksController],
      providers: [
        BlocksService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    controller = module.get<BlocksController>(BlocksController);
    service = module.get<BlocksService>(BlocksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('calls service.create and returns result', async () => {
      const dto = { title: 'b1', kind: $Enums.BlockKind.CONTENT };
      const created = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(created as any);

      const res = await controller.create(dto as any);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(res).toEqual(created);
    });
  });

  describe('findAll', () => {
    it('returns list', async () => {
      const list = [{ id: 1, title: 'b1' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(list as any);

      const res = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(res).toEqual(list);
    });
  });

  describe('findOne', () => {
    it('returns by id', async () => {
      const item = { id: 2, title: 'b2' };
      jest.spyOn(service, 'findOne').mockResolvedValue(item as any);

      const res = await controller.findOne('2');

      expect(service.findOne).toHaveBeenCalledWith(2);
      expect(res).toEqual(item);
    });
  });

  describe('update', () => {
    it('updates by id', async () => {
      const dto = { title: 'b1-upd' };
      const updated = { id: 1, title: 'b1-upd' };
      jest.spyOn(service, 'update').mockResolvedValue(updated as any);

      const res = await controller.update('1', dto as any);

      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(res).toEqual(updated);
    });
  });

  describe('remove', () => {
    it('deletes by id', async () => {
      const deleted = { id: 3 };
      jest.spyOn(service, 'remove').mockResolvedValue(deleted as any);

      const res = await controller.remove('3');

      expect(service.remove).toHaveBeenCalledWith(3);
      expect(res).toEqual(deleted);
    });
  });
});
