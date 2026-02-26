import { Result } from '@/01-entities/shared/base/result';
import { ListAttendanceByClassInteractor } from '@/02-usecases/attendance/ListAttendanceByClass.interactor';
import { MarkAttendanceInteractor } from '@/02-usecases/attendance/MarkAttendance.interactor';
import { MarkBatchAttendanceInteractor } from '@/02-usecases/attendance/MarkBatchAttendance.interactor';
import { AutoMarkAbsentInteractor } from '@/02-usecases/attendance/AutoMarkAbsent.interactor';
import { type ListAttendanceByClassInput } from '@/02-usecases/attendance/ports/input/ListAttendanceByClass.input';
import { type ListAttendanceByClassOutput } from '@/02-usecases/attendance/ports/output/ListAttendanceByClass.output';
import { type MarkAttendanceInput } from '@/02-usecases/attendance/ports/input/MarkAttendance.input';
import { type MarkAttendanceOutput } from '@/02-usecases/attendance/ports/output/MarkAttendance.output';
import { type MarkBatchAttendanceInput } from '@/02-usecases/attendance/ports/input/MarkBatchAttendance.input';
import { type MarkBatchAttendanceOutput } from '@/02-usecases/attendance/ports/output/MarkBatchAttendance.output';
import { type AutoMarkAbsentInput } from '@/02-usecases/attendance/ports/input/AutoMarkAbsent.input';
import { type AutoMarkAbsentOutput } from '@/02-usecases/attendance/ports/output/AutoMarkAbsent.output';

export class AttendanceController {
  private readonly listAttendanceInteractor: ListAttendanceByClassInteractor;
  private readonly markAttendanceInteractor: MarkAttendanceInteractor;
  private readonly markBatchAttendanceInteractor: MarkBatchAttendanceInteractor;
  private readonly autoMarkAbsentInteractor: AutoMarkAbsentInteractor;

  constructor(
    listAttendanceInteractor: ListAttendanceByClassInteractor,
    markAttendanceInteractor: MarkAttendanceInteractor,
    markBatchAttendanceInteractor: MarkBatchAttendanceInteractor,
    autoMarkAbsentInteractor: AutoMarkAbsentInteractor
  ) {
    this.listAttendanceInteractor = listAttendanceInteractor;
    this.markAttendanceInteractor = markAttendanceInteractor;
    this.markBatchAttendanceInteractor = markBatchAttendanceInteractor;
    this.autoMarkAbsentInteractor = autoMarkAbsentInteractor;
  }

  async listAttendanceByClass(input: ListAttendanceByClassInput): Promise<Result<ListAttendanceByClassOutput>> {
    return this.listAttendanceInteractor.execute(input);
  }

  async markAttendance(input: MarkAttendanceInput): Promise<Result<MarkAttendanceOutput>> {
    return this.markAttendanceInteractor.execute(input);
  }

  async markBatchAttendance(input: MarkBatchAttendanceInput): Promise<Result<MarkBatchAttendanceOutput>> {
    return this.markBatchAttendanceInteractor.execute(input);
  }

  async autoMarkAbsent(input: AutoMarkAbsentInput): Promise<Result<AutoMarkAbsentOutput>> {
    return this.autoMarkAbsentInteractor.execute(input);
  }
}