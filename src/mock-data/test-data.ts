import { StaffMember } from 'src/staff/models/staff-member';
import { CreateStaffMemberDto } from '../dto/create-staff-member';
import { Position } from '../staff/enums/position.enum';
import { SalaryRaiseConfig } from '../config/salary-raise-config';

const EmployeeDto: CreateStaffMemberDto = {
  name: 'John Employee',
  position: Position.employee,
  dateOfJoining: '2000-01-01T00:00:00Z',
  baseSalary: 1000,
  supervisor: null,
};

const ManagerDto: CreateStaffMemberDto = {
  name: 'Jane Manager',
  position: Position.manager,
  dateOfJoining: '2000-01-01T00:00:00Z',
  baseSalary: 1000,
  supervisor: null,
};

const SalesDto: CreateStaffMemberDto = {
  name: 'Jacob Sales',
  position: Position.sales,
  dateOfJoining: '2000-01-01T00:00:00Z',
  baseSalary: 1000,
  supervisor: null,
};

export const DTO = {
  Employee: EmployeeDto,
  Manager: ManagerDto,
  Sales: SalesDto,
};

const Employee: StaffMember = {
  id: 1,
  name: 'John Employee',
  dateOfJoining: new Date('2000-01-01T00:00:00Z'),
  baseSalary: 1000,
  position: Position.employee,
  supervisor: 2,
  subordinates: [],
  ...SalaryRaiseConfig[Position.employee],
  getYearsOfService: () => 24,
  calculateSalary: () => 1300,
};

const Manager: StaffMember = {
  id: 2,
  name: 'Jane Manager',
  dateOfJoining: new Date('2000-01-01T00:00:00Z'),
  baseSalary: 1000,
  position: Position.manager,
  supervisor: 3,
  subordinates: [1],
  ...SalaryRaiseConfig[Position.manager],
  getYearsOfService: () => 24,
  calculateSalary: () => 1400,
};

const Sales: StaffMember = {
  id: 3,
  name: 'Jacob Sales',
  dateOfJoining: new Date('2000-01-01T00:00:00Z'),
  baseSalary: 1000,
  position: Position.sales,
  supervisor: null,
  subordinates: [2, 1],
  ...SalaryRaiseConfig[Position.sales],
  getYearsOfService: () => 24,
  calculateSalary: () => 1350,
};

export const Staff = { Employee, Manager, Sales };
