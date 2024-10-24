import { Position } from '../staff/enums/position.enum';

export const SalaryRaiseConfig = {
  [Position.employee]: {
    salaryRaiseFactor: 0.03,
    maxSalaryRaiseFactor: 0.3,
    subordinatesSalaryFactor: 0,
  },
  [Position.manager]: {
    salaryRaiseFactor: 0.05,
    maxSalaryRaiseFactor: 0.4,
    subordinatesSalaryFactor: 0.005,
  },
  [Position.sales]: {
    salaryRaiseFactor: 0.01,
    maxSalaryRaiseFactor: 0.35,
    subordinatesSalaryFactor: 0.003,
  },
};
