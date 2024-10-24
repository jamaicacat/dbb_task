import { Injectable } from '@nestjs/common';
import { StaffMember } from './models/staff-member';
import { Position } from './enums/position.enum';
import { CreateStaffMemberDto } from '../dto/create-staff-member';
import * as mockData from '../mock-data/staff.json';

@Injectable()
export class StaffService {
  private staffMembers: StaffMember[] = [];

  createStaffMember(staff: CreateStaffMemberDto): StaffMember {
    const id = this.generateStaffId();

    if (staff.supervisor) {
      this.validateSupervisor(staff.supervisor);
    }

    const staffMember = new StaffMember(
      id,
      staff.name,
      staff.position,
      staff.dateOfJoining,
      staff.baseSalary,
      staff.supervisor,
    );

    this.staffMembers.push(staffMember);

    return staffMember;
  }

  generateStaffId(): number {
    const id = this.staffMembers.length + 1;

    return id;
  }

  validateSupervisor(supervisorId: number): void {
    const supervisor = this.getStaffMemberById(supervisorId);

    if (supervisor.position === Position.employee) {
      throw new Error('Employees cannot be supervisors');
    }
  }

  getStaffMemberById(id: number): StaffMember {
    const staffMember = this.staffMembers.find((staff) => staff.id === id);

    if (!staffMember) {
      throw new Error(`No staff member with id ${id} found`);
    }

    return staffMember;
  }

  assignSupervisor(staffId: number, supervisorId: number): void {
    const staff = this.getStaffMemberById(staffId);

    this.validateSupervisor(supervisorId);

    const supervisor = this.getStaffMemberById(supervisorId);

    if (supervisor.subordinates.includes(staff.id)) {
      throw new Error(
        'Staff member is already a subordinate of the supervisor',
      );
    }

    staff.supervisor = supervisor.id;
    supervisor.subordinates.push(staff.id);
  }

  getAllStaff(): StaffMember[] {
    return this.staffMembers;
  }

  initStaff(): StaffMember[] {
    // Initialize staff members from mock data
    for (const mockStaffMember of mockData) {
      const staffMember = this.createStaffMember({
        ...mockStaffMember,
        position: mapStringToPosition(mockStaffMember.position),
      });
    }

    // Assign random supervisors
    for (const staffMember of this.staffMembers) {
      // Skip error of assigning employee as a supervisor
      try {
        const randomStaffId =
          Math.floor(Math.random() * this.staffMembers.length) + 1;
        this.assignSupervisor(staffMember.id, randomStaffId);
      } catch (error) {}
    }

    return this.staffMembers;

    // helper function to map string to Position enum
    function mapStringToPosition(position: string): Position {
      switch (position.toLowerCase()) {
        case 'sales':
          return Position.sales;
        case 'manager':
          return Position.manager;
        case 'employee':
          return Position.employee;
      }
    }
  }
}
