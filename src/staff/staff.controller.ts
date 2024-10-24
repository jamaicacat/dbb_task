import {
  Get,
  Post,
  Body,
  Controller,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffMember } from './models/staff-member';
import { CreateStaffMemberDto } from '../dto/create-staff-member';

@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get('/')
  getStaffMembers(): StaffMember[] {
    return this.staffService.getAllStaff();
  }

  @Post('/')
  createStaffMember(@Body() staffMember: CreateStaffMemberDto): StaffMember {
    return this.staffService.createStaffMember(staffMember);
  }

  @Get('/:id')
  getStaffMemberById(@Param('id', ParseIntPipe) id: number): StaffMember {
    return this.staffService.getStaffMemberById(id);
  }

  @Post('/init')
  initStaff(): StaffMember[] {
    return this.staffService.initStaff();
  }
}
