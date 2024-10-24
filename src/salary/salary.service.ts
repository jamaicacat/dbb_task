import { Injectable } from '@nestjs/common';
import { StaffService } from '../staff/staff.service';
import { SalaryRaiseConfig } from '../config/salary-raise-config';

@Injectable()
export class SalaryService {
  constructor(private readonly staffService: StaffService) {}

  getStaffMemberSalary(id: number) {
    const staffMember = this.staffService.getStaffMemberById(id);

    let raisedBaseSalary = staffMember.calculateSalary();
    let subordinatesSalary = 0;

    if (staffMember.subordinates.length > 0) {
      const salaryRaiseConfig = SalaryRaiseConfig[staffMember.position];

      for (const subordinateId of staffMember.subordinates) {
        const subordinate = this.staffService.getStaffMemberById(subordinateId);

        subordinatesSalary += subordinate.calculateSalary();
      }

      subordinatesSalary =
        subordinatesSalary * salaryRaiseConfig.subordinatesSalaryFactor;
    }

    return {
      ...staffMember,
      salary: parseFloat((raisedBaseSalary + subordinatesSalary).toFixed(2)),
    };
  }

  getTotalSalary(): {
    staff: number;
    totalSalary: number;
  } {
    const staffMembers = this.staffService.getAllStaff();

    let totalSalary = 0;

    for (const staffMember of staffMembers) {
      totalSalary += this.getStaffMemberSalary(staffMember.id).salary;
    }

    return {
      staff: staffMembers.length,
      totalSalary,
    };
  }
}
