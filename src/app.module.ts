import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffModule } from './staff/staff.module';
import { SalaryService } from './salary/salary.service';
import { SalaryModule } from './salary/salary.module';
import { SalaryController } from './salary/salary.controller';

@Module({
  imports: [StaffModule, SalaryModule],
  controllers: [AppController, SalaryController],
  providers: [AppService, SalaryService],
})
export class AppModule {}
