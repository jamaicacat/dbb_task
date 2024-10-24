import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from './staff.service';
import { StaffMember } from './models/staff-member';
import { DTO } from '../mock-data/test-data';

describe('StaffService', () => {
  let service: StaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffService],
    }).compile();

    service = module.get<StaffService>(StaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStaffMemberById', () => {
    it('should throw an error if staff member does not exist', () => {
      expect(() => service.getStaffMemberById(0)).toThrow(
        'No staff member with id 0 found',
      );
    });
  });

  describe('createStaffMember', () => {
    it('should create a staff member successfully', () => {
      const staffMember = service.createStaffMember(DTO.Employee);

      expect(staffMember).toBeInstanceOf(StaffMember);
      expect(staffMember.name).toBe('John Employee');
      expect(staffMember.baseSalary).toBe(1000);
      expect(service.getAllStaff().length).toBe(1);
    });
  });

  describe('validateSupervisor', () => {
    it('should throw error if supervisor does not exist', () => {
      expect(() => service.validateSupervisor(0)).toThrow(
        'No staff member with id 0 found',
      );
    });

    it('should throw error if supervisor is an employee', () => {
      const supervisor = service.createStaffMember(DTO.Employee);

      expect(() => service.validateSupervisor(supervisor.id)).toThrow(
        'Employees cannot be supervisors',
      );
    });
  });

  describe('assignSupervisor', () => {
    it('should assign a supervisor successfully', () => {
      const manager = service.createStaffMember(DTO.Manager);
      const employee = service.createStaffMember(DTO.Employee);

      service.assignSupervisor(employee.id, manager.id);

      expect(employee.supervisor).toBe(manager.id);
      expect(manager.subordinates).toContain(employee.id);
    });

    it('should throw error if staff member does not exist', () => {
      expect(() => service.assignSupervisor(0, 1)).toThrow(
        'No staff member with id 0 found',
      );
    });
  });

  describe('initStaff', () => {
    it('should initialize staff from mock data', () => {
      const staffMembers = service.initStaff();
      expect(staffMembers.length).toBeGreaterThanOrEqual(100);
      expect(staffMembers[0]).toBeInstanceOf(StaffMember);
    });
  });
});
