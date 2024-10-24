import { Module } from '@nestjs/common';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports: [StaffModule],
  providers: [SalaryService],
  controllers: [SalaryController],
})
export class SalaryModule {}
