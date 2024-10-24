import { Test, TestingModule } from '@nestjs/testing';
import { SalaryController } from './salary.controller';
import { StaffModule } from 'src/staff/staff.module';
import { SalaryService } from './salary.service';

describe('SalaryController', () => {
  let controller: SalaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryController],
      imports: [StaffModule],
      providers: [SalaryService],
    }).compile();

    controller = module.get<SalaryController>(SalaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
