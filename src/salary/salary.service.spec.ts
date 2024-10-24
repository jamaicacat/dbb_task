import { Test, TestingModule } from '@nestjs/testing';
import { SalaryService } from './salary.service';
import { StaffService } from '../staff/staff.service';
import { Position } from '../staff/enums/position.enum';
import { SalaryRaiseConfig } from '../config/salary-raise-config';
import { Staff } from '../mock-data/test-data';

describe('SalaryService', () => {
  let salaryService: SalaryService;
  let staffService: jest.Mocked<StaffService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalaryService,
        {
          provide: StaffService,
          useValue: {
            getStaffMemberById: jest.fn().mockImplementation((id) => {
              switch (id) {
                case 1:
                  return Staff.Employee;
                case 2:
                  return Staff.Manager;
                case 3:
                  return Staff.Sales;
              }
            }),
            getAllStaff: jest
              .fn()
              .mockImplementation(() => [
                Staff.Employee,
                Staff.Manager,
                Staff.Sales,
              ]),
          },
        },
      ],
    }).compile();

    salaryService = module.get<SalaryService>(SalaryService);
    staffService = module.get(StaffService);
  });

  // Test case for getStaffMemberSalary
  describe('getStaffMemberSalary', () => {
    it('should calculate salary for employee', () => {
      const result = salaryService.getStaffMemberSalary(1);

      expect(staffService.getStaffMemberById).toHaveBeenCalledWith(1);
      expect(result.salary).toBe(1300); // No subordinate salary included
    });
    it('should calculate salary for manager', () => {
      const result = salaryService.getStaffMemberSalary(2);

      /**
       * Manager's salary raise calculation:
       * Base salary: 1000
       * Max salary raise factor = 40%
       * Raised salary: 1000 + 1000 * 40% = 1400
       *
       * Subordinate salary calculation:
       * Raised salary: 1300
       * Subordinate salary factor = 0.5%
       * Subordinate salary: 1300 * 0.5% = 6.5
       *
       * Total manager's salary: 1400 + 6.5 ~= 1406.5
       */
      expect(result.salary).toBeGreaterThan(1405);
    });
    it('should calculate salary for sales', () => {
      const result = salaryService.getStaffMemberSalary(3);

      /**
       * Sales' salary raise calculation:
       * Base salary: 1000
       * Max salary raise factor = 35%
       * Raised salary: 1000 + 1000 * 35% = 1350
       *
       * Subordinate salary calculation:
       * Subordinate salary factor = 0.3%
       * Manager's salary: 1400 * 0.3% = 4.2
       * Employees' salary: 1300 * 0.3% = 3.9
       *
       * Total sales salary: 1350 + 4.2 + 3.9 ~= 1358.1
       */

      expect(result.salary).toBe(1358.1);
    });
  });

  describe('getTotalSalary', () => {
    it('should calculate the total salary for all staff members', () => {
      const result = salaryService.getTotalSalary();

      /**
       * Total salary calculation:
       * Employee's salary: 1300
       * Manager's salary: 1406.5
       * Sales' salary: 1358.1
       *
       * Total salary: 1300 + 1406.5 + 1358.1 ~= 4064.6
       * Total staff members: 3
       */

      expect(result.staff).toBe(3);
      expect(result.totalSalary).toBe(4064.6);
    });
  });
});
