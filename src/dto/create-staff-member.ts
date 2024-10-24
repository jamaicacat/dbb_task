import { Position } from '../staff/enums/position.enum';
import {
  IsEnum,
  IsInt,
  Min,
  IsNotEmpty,
  MaxDate,
  MinDate,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateStaffMemberDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @MinDate(new Date(new Date().setFullYear(2000, 0, 1)), {
    message: 'Date of joining should be after 2000-01-01',
  })
  @MaxDate(new Date(), { message: 'Incorrect date of joining' })
  dateOfJoining: string;

  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(Position, {
    message: ({ value }) => `'${value}' is an invalid position`,
  })
  position: Position;

  @IsInt()
  @Min(100, { message: 'Base salary should be at least 100' })
  baseSalary: number;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Supervisor ID cannot be less than 1' })
  supervisor?: number;
}
