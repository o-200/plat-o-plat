import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTagsController } from './service-tags.controller';
import { ServiceTagsService } from './service-tags.service';
import { UpdateServiceTagDto } from './dto/update-service-tag.dto';

describe('ServiceTagsController', () => {
  let controller: ServiceTagsController;
  let service: ServiceTagsService;

  const serviceMock = {
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as unknown as ServiceTagsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceTagsController],
      providers: [{ provide: ServiceTagsService, useValue: serviceMock }],
    }).compile();

    controller = module.get(ServiceTagsController);
    service = module.get(ServiceTagsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('calls service with numeric id', async () => {
      (service.findOne as jest.Mock).mockResolvedValue({ id: 7 });

      const res = await controller.findOne('7');

      expect(service.findOne).toHaveBeenCalledWith(7);
      expect(res).toEqual({ id: 7 });
    });
  });

  describe('update', () => {
    it('calls service with numeric id and dto', async () => {
      const dto: UpdateServiceTagDto = { title: 'upd' } as any;
      const updated = { id: 3, title: 'upd' };
      (service.update as jest.Mock).mockResolvedValue(updated);

      const res = await controller.update('3', dto);

      expect(service.update).toHaveBeenCalledWith(3, dto);
      expect(res).toEqual(updated);
    });
  });

  describe('remove', () => {
    it('calls service with numeric id', async () => {
      (service.remove as jest.Mock).mockResolvedValue({ id: 5 });

      const res = await controller.remove('5');

      expect(service.remove).toHaveBeenCalledWith(5);
      expect(res).toEqual({ id: 5 });
    });
  });
});
