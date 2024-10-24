import { Position } from '../enums/position.enum';
import { SalaryRaiseConfig } from '../../config/salary-raise-config';

export class StaffMember {
  id: number;
  name: string;
  dateOfJoining: Date;
  baseSalary: number;
  position: Position;
  supervisor?: number;
  subordinates: number[] = [];

  salaryRaiseFactor: number;
  subordinatesSalaryFactor: number;

  constructor(
    id: number,
    name: string,
    position: Position,
    dateOfJoining: string,
    baseSalary: number,
    supervisor?: number | null,
  ) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.dateOfJoining = new Date(dateOfJoining);
    this.baseSalary = baseSalary;
    this.supervisor = supervisor;
  }

  getYearsOfService(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - this.dateOfJoining.getFullYear();
  }

  calculateSalary(): number {
    const salaryRaiseConfig = SalaryRaiseConfig[this.position];

    const resultSalaryRaiseFactor = parseFloat(
      Math.min(
        this.getYearsOfService() * salaryRaiseConfig.salaryRaiseFactor,
        salaryRaiseConfig.maxSalaryRaiseFactor,
      ).toFixed(2),
    ); // get the minimum between the (salary raise Factor * years of service) and the max salary raise Factor

    return (
      this.baseSalary + Math.round(this.baseSalary * resultSalaryRaiseFactor)
    );
  }
}
