import { Get, Controller, Param, ParseIntPipe } from '@nestjs/common';
import { SalaryService } from './salary.service';

@Controller('staff/salary')
export class SalaryController {
  constructor(private salaryService: SalaryService) {}

  @Get('/total')
  getTotalSalary() {
    return this.salaryService.getTotalSalary();
  }

  @Get('/:id')
  getStaffMemberSalary(@Param('id', ParseIntPipe) id: number) {
    return this.salaryService.getStaffMemberSalary(id);
  }
}
