// src/02-usecases/class/ListClassesByDate.interactor.ts

import { Result } from '@/01-entities/shared/base/result';
import { type Class } from '@/01-entities/classes/Class.entity';
import { type DayOfWeek } from '@/01-entities/classes/ClassSession';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type ListClassesByDateInput } from './ports/input/ListClassesByDate.input';
import { type ListClassesByDateOutput } from './ports/output/ListClassesByDate.output';
import { isValid } from 'date-fns';

export class ListClassesByDateInteractor {
  private readonly classRepo: IClassRepository;

  constructor(classRepo: IClassRepository) {
    this.classRepo = classRepo;
  }

  async execute(input: ListClassesByDateInput): Promise<Result<ListClassesByDateOutput>> {
    try {
      // Basic validation: Ensure date is provided
      if (!input.date) {
        return Result.fail('Date is required to list classes by date.');
      }

      if (!isValid(new Date(input.date))) {
        return Result.fail('Invalid date format.');
      }

      // 1. Fetch initial classes, filtering by branch if provided
      let initialClasses: Class[];
      if (input.branchId) {
        initialClasses = await this.classRepo.getByBranchId(input.branchId);
      } else {
        initialClasses = await this.classRepo.getAll();
      }

      // 2. Filter classes based on the provided date and their sessions.
      // Also filter for active classes only
      const filteredClasses = initialClasses.filter(cls => {
        if (cls.status !== 'active') return false;

         // Check if the class has a session on the given date
        return cls.sessions.some(session => {
          // Convert the selected date to a day of the week (Mon, Tue, Wed, etc.)
          // FIX: Parse YYYY-MM-DD explicitly to avoid UTC timezone shifts causing wrong day calculation
          const [year, month, day] = input.date.split('-').map(Number);
          const localDate = new Date(year, month - 1, day);
          const selectedDay = localDate.toLocaleDateString('en-US', { weekday: 'short' }) as DayOfWeek;
          return session.day === selectedDay;
        });
      });

      // 3. Map the entities to DTOs (Data Transfer Objects) for the output
      const classDTOs = filteredClasses.map((cls: Class) => ({
        id: cls.id.toString() ,
        name: cls.name,
        code: cls.code,
        branchId: cls.branchId.toString() ,
        teacherName: cls.teacherName,
        maxStudents: cls.maxStudents,
        currentStudents: cls.currentStudents,
        schedule: cls.schedule,
        status: cls.status,
        sessions: cls.sessions // Returning raw sessions for now
      }));

      return Result.ok(classDTOs);
    } catch (error: any) {
      console.error('Error in ListClassesByDateInteractor:', error);
      return Result.fail(`Failed to list classes by date: ${error.message}`);
    }
  }
}